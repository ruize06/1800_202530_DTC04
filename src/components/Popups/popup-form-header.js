class PopupFormHeader extends HTMLElement {
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
      <div
        class="sticky flex flex-row items-center justify-between top-0 bg-inherit py-4 border-b border-[var(--primary-border-color)]">
        <p class="text-3xl font-bold">${title}</p>
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
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title" && oldValue !== newValue) {
      this.render(newValue);
    }
  }
}

customElements.define("popup-form-header", PopupFormHeader);
