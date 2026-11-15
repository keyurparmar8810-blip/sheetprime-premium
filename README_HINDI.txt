SHEETPRIME PREMIUM PWA — HINDI GUIDE

PACKAGE FILES
- SheetPrime_Premium_Final.html: tumhari existing spreadsheet app; PWA install/update aur safe data backup/restore add kiya gaya hai.
- index.html: hosting ke liye same app ka home-page copy.
- manifest.json: app name, icon, standalone display aur theme settings.
- service-worker.js: offline app-shell cache aur XLSX/PDF.js library runtime cache.
- icons/: tumhare diye hue official logo se bane 192px, 512px aur maskable 512px icons.

HOSTING
ZIP ko extract karke folder ke andar ki saari files GitHub Pages ya Netlify par upload karo. Website HTTPS par honi chahiye. `index.html` root par hona chahiye.

DATA PRESERVATION — ZAROORI
Acode preview/file preview aur HTTPS website ka browser origin alag ho sakta hai. Isliye purana localStorage data automatically naye hosted PWA mein nahi aata, bhale hi key same ho.
1. Purane Acode preview mein app kholo. View tab → Backup Data dabao. `SheetPrime_Data_Backup.json` save karo.
2. Hosted HTTPS SheetPrime kholo. View tab → Restore Backup dabao. Wahi JSON file select karo aur confirmation do.
3. Restore se pehle current hosted data ka backup `sheetlite_complete_v2_backup` mein rakha jayega.
4. Chrome ka site data/cache clear mat karna.

OFFLINE
Normal spreadsheet editing aur localStorage autosave offline chal sakte hain jab app ek baar online khul chuki ho aur service worker install ho gaya ho. XLSX/PDF.js libraries original app mein CDN se load hoti hain. App online open hone par PWA un libraries ko background mein cache karne ki koshish karta hai. CDN access successful hona zaroori hai; offline hone se pehle online ek baar app kholkar XLSX export/import aur PDF import test kar lena. First-ever offline launch par XLSX/PDF tools ki guarantee nahi hai.

ANDROID INSTALL
1. HTTPS hosting par files upload karo.
2. Android Chrome mein website kholo aur page load hone do.
3. Service worker first time install hone ke baad zarurat pade to ek baar refresh karo.
4. `Install App` button dikhe to dabao; warna Chrome ⋮ → Install app / Add to Home screen.
5. App ko ek baar online chalao, phir Airplane mode mein editing aur autosave test karo.

LIMITATIONS
Ye PWA hai, APK nahi. Is build mein actual Android device/browser test nahi hua. XLSX/PDF libraries ko is environment mein download karke package ke andar vendor nahi kar paya; runtime caching use hoti hai.
