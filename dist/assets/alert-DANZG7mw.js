function r(l,s="success"){const a={success:"from-[var(--light-secondary-button-bg-color)] to-[var(--light-primary-button-bg-color)] text-white",error:"from-red-400 to-red-600 text-white",warning:"from-amber-200 to-amber-300 text-black"},e=document.createElement("div");e.className=`
    fixed inset-0 bg-black/50 z-50
    flex justify-center items-center
  `;const t=document.createElement("div");t.className=`
    bg-gradient-to-r ${a[s]||a.info} 
    px-8 py-6 rounded-2xl shadow-2xl
    text-center flex flex-col items-center gap-4
    max-w-xs w-full
  `;const n=document.createElement("p");n.textContent=l,n.className="text-xl font-semibold";const o=document.createElement("button");o.textContent="OK",o.className=`
    mt-2 px-6 py-2 rounded-full bg-white text-black font-semibold 
    shadow-lg hover:scale-115 hover:shadow-xl transition-all duration-300
  `,o.addEventListener("click",()=>e.remove()),t.appendChild(n),t.appendChild(o),e.appendChild(t),document.body.appendChild(e)}export{r as s};
