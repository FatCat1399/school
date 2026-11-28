// منصة الأداء التعليمي — العمل بدون إنترنت
// يُرفع هذا الملف مرة واحدة بجانب index.html ولا يحتاج تعديلًا عند تحديث البرنامج.
const C="mnasa-app-v1",ROOT=new URL("./",self.location).href,RP=new URL(ROOT).pathname;
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(async c=>{if(await c.match(ROOT))return;try{const r=await fetch(ROOT,{cache:"reload"});if(r.ok)await c.put(ROOT,r)}catch(_){}}))});
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET"||q.mode!=="navigate")return;const u=new URL(q.url);
 if(u.origin!==self.location.origin||!(u.pathname===RP||u.pathname===RP+"index.html")||u.searchParams.has("u"))return;
 e.respondWith((async()=>{const c=await caches.open(C),hit=await c.match(ROOT);if(hit)return hit;
  try{const r=await fetch(q);if(r.ok&&r.type==="basic")c.put(ROOT,r.clone());return r}
  catch(_){return new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><p dir="rtl" style="font:18px system-ui,sans-serif;padding:24px;line-height:1.8">لا يوجد اتصال بالإنترنت، ولم يُحفظ البرنامج على هذا الجهاز بعد.<br>افتحه مرة واحدة وأنت متصل بالإنترنت، وبعدها يعمل بدونه.</p>',{headers:{"Content-Type":"text/html; charset=utf-8"}})}})())});
