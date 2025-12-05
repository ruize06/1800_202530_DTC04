class s extends HTMLElement{static get observedAttributes(){return["title"]}constructor(){super(),this.title=this.getAttribute("title")||"Title",this.render()}render(t=this.title){this.innerHTML=`
      <nav class="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200">
        <div class="max-w-5xl mx-auto py-4 px-6 flex items-center justify-center">
          <h1 class="text-2xl font-semibold">${t}</h1>
        </div>
      </nav>
    `}attributeChangedCallback(t,i,e){t==="title"&&i!==e&&this.render(e)}}customElements.define("top-nav",s);
