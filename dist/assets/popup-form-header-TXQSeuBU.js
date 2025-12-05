function c(e){if(e.length==7){const n=[parseInt(e.substring(1,3),16),parseInt(e.substring(3,5),16),parseInt(e.substring(5),16)];return .2126*n[0]/255+.7152*n[1]/255+.0722*n[2]/255>.5}return!1}function d(e,n){const t=e.indexOf(n);t!==-1&&e.splice(t,1)}function u(e,n){var t=e.cloneNode(!0);n.appendChild(t);for(let s of e.attributes)console.log(s.name),t.setAttribute(s.name,s.value);return t}function f(e,n=300){e?.classList.toggle("translate-y-full",!0),setTimeout(()=>{e?.classList.toggle("hidden",!0)},n)}function b(e){e?.classList.toggle("hidden",!1),setTimeout(()=>{e?.classList.toggle("translate-y-full",!1)},0)}function p(e,n,t,s,i){const r=o=>{s(o)},l=o=>{i(o)};e?.addEventListener("click",r),n?.addEventListener("click",l),t?.getAttribute("listener")!=="true"&&(t?.setAttribute("listener","true"),t?.addEventListener("focusout",()=>{}),t?.addEventListener("focusin",()=>{}))}function h({message:e,onConfirm:n}){const t=document.createElement("div");t.id="confirmationPopup",t.className=`
    fixed inset-0 flex justify-center items-center z-50
    bg-black/50 px-4
  `;const s=document.createElement("div");return s.className=`
    bg-gradient-to-r from-[var(--light-secondary-button-bg-color)]
    to-[var(--light-primary-button-bg-color)]
    text-white rounded-2xl px-6 py-6 shadow-2xl
    w-full max-w-md flex flex-col gap-8
    sm:px-8
  `,s.innerHTML=`
    <p class="text-xl font-bold text-center">${e}</p>
    <div class="flex justify-center gap-6 mt-4 w-full">
      <button id="confirmBtn" type="button"
              class="w-28 px-6 py-2 rounded-full bg-white text-black
                     font-semibold shadow-lg hover:scale-115 hover:shadow-xl transition-all duration-300">
        Confirm
      </button>
      <button id="cancelBtn"
              class="w-28 px-6 py-2 rounded-full bg-white text-black
                     font-semibold shadow-lg hover:scale-115 hover:shadow-xl transition-all duration-300">
        Cancel
      </button>
    </div>
  `,t.appendChild(s),document.body.appendChild(t),s.querySelector("#confirmBtn").addEventListener("click",()=>{n?.(),t.remove()}),s.querySelector("#cancelBtn").addEventListener("click",()=>{t.remove()}),t}class a extends HTMLElement{static get observedAttributes(){return["title"]}constructor(){super(),this.title=this.getAttribute("title")||"Title",this.render()}render(n=this.title){this.innerHTML=`
      <div
        class="sticky flex flex-row items-center justify-between top-0 bg-inherit py-4 border-b border-[var(--primary-border-color)]">
        <p class="text-3xl font-bold">${n}</p>
        <!-- Cancel Button -->
        <div class="cancelButton p-4 rounded-full hover:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-x">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </div>
      </div>
    `}attributeChangedCallback(n,t,s){n==="title"&&t!==s&&this.render(s)}}customElements.define("popup-form-header",a);export{d as a,p as b,u as c,h as d,f as h,c as i,b as s};
