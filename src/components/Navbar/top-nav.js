class TopNav extends HTMLElement {
  static get observedAttributes() {
    return ["title"];
  }

  constructor() {
    super();
    this.title = this.getAttribute("title") || "Title";
    this.render();
  }

  render(title = this.title) {
    this.innerHTML = `
      <nav class="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200">
        <div class="max-w-5xl mx-auto py-4 px-6 flex items-center justify-center">
          <h1 class="text-2xl font-semibold">${title}</h1>
        </div>
      </nav>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title" && oldValue !== newValue) {
      this.render(newValue);
    }
  }
}

customElements.define("top-nav", TopNav);
