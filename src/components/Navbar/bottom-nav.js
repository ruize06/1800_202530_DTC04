class BottomNav extends HTMLElement {
  static get observedAttributes() {
    return [`active`];
  }

  constructor() {
    super();
    this.active = 0;
    this.render();

    this.pages = [
      // Populate with pages like home, calendar, groups, profile
      "/main.html",
      "/todo.html?type=user",
      "/sharepage_Groups.html",
      "/profile.html",
    ];

    // User clicks on navigation option
    this.addEventListener("click", (event) => {
      if (event.target.closest("nav-item") == null) {
        return;
      }
      // Get the clicked nav-item index
      let newPageIndex = [
        ...document.getElementById("bottom-nav-options").children,
      ].indexOf(event.target.closest("nav-item"));
      // Changes the icon that is active for the navbar
      this.setAttribute("active", newPageIndex);
      // Switches the current page
      this.changePage(this.pages[this.active]);
    });
  }

  render() {
    this.innerHTML = `
      <nav class="w-full md:max-w-fit md:left-1/2 md:-translate-x-1/2 fixed bottom-0 md:bottom-4">
          <div id="bottom-nav-options"
              class="bg-[var(--light-primary-button-bg-color)] p-2 md:scale-50 md:hover:scale-100 transition-transform duration-200 flex flex-row items-center hover:items-stretch justify-around space-x-2 md:space-x-8 md:max-w-fit md:max-h-fit mx-auto rounded-none md:rounded-full">

              <!-- Nav items -->
              <nav-item>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-home-2">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <path d="M10 12h4v4h-4z" />
                  </svg>
              </nav-item>
              <nav-item>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-event">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                      <path d="M16 3l0 4" />
                      <path d="M8 3l0 4" />
                      <path d="M4 11l16 0" />
                      <path d="M8 15h2v2h-2z" />
                  </svg>
              </nav-item>
              <nav-item>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
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
              <nav-item>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-user-circle">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                  </svg>
              </nav-item>
          </div>
      </nav>`;
  }

  changePage(newPage) {
    window.location.href = newPage;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "active") {
      document
        .getElementById("bottom-nav-options")
        .children[this.active].setAttribute("active", "false");
      this.active = newValue;
      console.log(newValue);
      document
        .getElementById("bottom-nav-options")
        .children[this.active].setAttribute("active", "true");
      console.log(
        document.getElementById("bottom-nav-options").children[this.active]
          .active
      );
    }
  }
}

customElements.define("bottom-nav", BottomNav);
