class a extends HTMLElement{static get observedAttributes(){return["active","pagetitle"]}constructor(){super(),this.active=!1,this.content=this.innerHTML,this.render()}render(){this.classList.toggle("text-[var(--deactive-button-bg-color)]",!0),this.innerHTML=`
        <div class = "hover:text-[var(--active-border-color)] flex flex-col items-center justify-end cursor-pointer
                rounded-full p-4 [&_svg]:w-[20vw] [&_svg]:max-w-[50px] [&_svg]:h-auto transition-all duration-200">
            ${this.content}
            <h3 class="text-sm font-semibold">
        </div>
        `}attributeChangedCallback(t,o,e){t==="active"?(this.active=e,this.active=="true"?(this.classList.toggle("text-[var(--contrast-text-color)]",!0),this.classList.toggle("text-[var(--deactive-button-bg-color)]",!1)):(this.classList.toggle("text-[var(--deactive-button-bg-color)]",!0),this.classList.toggle("text-[var(--contrast-text-color)]",!1)),console.log(e)):t==="pagetitle"&&(this.title=e,this.querySelector("h3").innerText=e,console.log(e))}}customElements.define("nav-item",a);class s extends HTMLElement{static get observedAttributes(){return["active"]}constructor(){super(),this.active=0,this.render(),this.pages=["/main.html","/todo.html?type=user","/sharepage_Groups.html","/profile.html"],this.addEventListener("click",t=>{if(t.target.closest("nav-item")==null)return;let o=[...document.getElementById("bottom-nav-options").children].indexOf(t.target.closest("nav-item"));this.setAttribute("active",o),this.changePage(this.pages[this.active])})}render(){this.innerHTML=`
      <nav class="w-full md:max-w-fit md:left-1/2 md:-translate-x-1/2 fixed bottom-0 md:bottom-4">
          <div id="bottom-nav-options"
              class="bg-[var(--primary-button-bg-color)] shadow-lg border-t-2 md:border-2 border-[var(--secondary-bg-color)]
              px-2 py-0 md:hover:px-6 md:max-w-fit md:max-h-fit mx-auto
              transition-transform duration-200
              md:scale-60 md:hover:scale-100
              md:[&_h3]:hidden md:hover:[&_h3]:block
              flex flex-row items-center justify-around md:space-x-4 md:hover:space-x-0 rounded-none md:rounded-full">

              <!-- Nav items -->
              <!-- home -->
              <nav-item pagetitle="Home">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-home-2">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <path d="M10 12h4v4h-4z" />
                  </svg>
              </nav-item>
              <!-- todo list -->
              <nav-item pagetitle="Your List">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-list-check">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5m-9 0a1 1 0 1 0 4 0a1 1 0 1 0 -4 0" />
                  <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
                  <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
                  <path d="M11 6l9 0" />
                  <path d="M11 12l9 0" />
                  <path d="M11 18l9 0" />
                </svg>
              </nav-item>
              <!-- groups -->
              <nav-item pagetitle="Groups">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-users-group">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                      <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                      <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                  </svg>
              </nav-item>
              <!-- profile -->
              <nav-item pagetitle="Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-user-circle">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                  </svg>
              </nav-item>
          </div>
      </nav>`}changePage(t){window.location.href=t}attributeChangedCallback(t,o,e){t==="active"&&(document.getElementById("bottom-nav-options").children[this.active].setAttribute("active","false"),this.active=e,console.log(e),document.getElementById("bottom-nav-options").children[this.active].setAttribute("active","true"),console.log(document.getElementById("bottom-nav-options").children[this.active].active))}}customElements.define("bottom-nav",s);
