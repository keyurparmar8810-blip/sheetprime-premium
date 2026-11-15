/* SheetPrime Premium service worker */
const CACHE_NAME = 'sheetprime-premium-v1';
const APP_SHELL = [
  './', './index.html', './SheetPrime_Premium_Final.html', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'
];
const EXTERNAL_LIBS = [
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];
self.addEventListener('install', event => {
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    // Cache all same-origin app assets; index.html is an optional alias for common hosts.
    for(const url of APP_SHELL){
      try{await cache.add(url);}catch(e){if(url!=='./index.html')throw e;}
    }
    self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('sheetprime-premium-')&&k!==CACHE_NAME).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if(event.data && event.data.type==='SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch', event => {
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  // Runtime cache third-party XLSX/PDF libraries after first successful online fetch.
  if(url.origin!==self.location.origin){
    if(EXTERNAL_LIBS.includes(req.url)){
      event.respondWith((async()=>{
        const cached=await caches.match(req);
        if(cached)return cached;
        try{
          const response=await fetch(req);
          if(response && response.ok){const cache=await caches.open(CACHE_NAME);await cache.put(req,response.clone());}
          return response;
        }catch(e){return new Response('This library has not been cached yet. Connect to the internet once, then reopen SheetPrime.',{status:503,headers:{'Content-Type':'text/plain'}});}
      })());
    }
    return;
  }
  if(req.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const response=await fetch(req);
        const cache=await caches.open(CACHE_NAME);cache.put('./SheetPrime_Premium_Final.html',response.clone());
        return response;
      }catch(e){return (await caches.match('./SheetPrime_Premium_Final.html')) || (await caches.match('./')) || Response.error();}
    })());
    return;
  }
  event.respondWith((async()=>{
    const cached=await caches.match(req);
    if(cached)return cached;
    try{
      const response=await fetch(req);
      if(response && response.ok){const cache=await caches.open(CACHE_NAME);cache.put(req,response.clone());}
      return response;
    }catch(e){return cached || Response.error();}
  })());
});
