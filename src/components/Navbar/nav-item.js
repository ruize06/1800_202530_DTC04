class NavItem extends HTMLElement {
    static get observedAttributes() {
        return [`active`, `pagetitle`];
    }

    constructor() {
        super();
        this.active = false;
        this.content = this.innerHTML;
        this.render();
    }

    render() {
        this.classList.toggle("text-[var(--deactive-button-bg-color)]", true);
        this.innerHTML = `
        <div class = "hover:text-[var(--deactive-button-bg-color)] flex flex-col items-center justify-end cursor-pointer
                rounded-full p-4 [&_svg]:w-[20vw] [&_svg]:max-w-[50px] [&_svg]:h-auto transition-all duration-200">
            ${this.content}
            <h3 class="text-sm font-semibold">
        </div>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "active") {
            this.active = newValue;
            if (this.active == "true") {
                this.classList.toggle("text-[var(--contrast-text-color)]", true);
                this.classList.toggle("text-[var(--deactive-button-bg-color)]", false);
            } else {
                this.classList.toggle("text-[var(--deactive-button-bg-color)]", true);
                this.classList.toggle("text-[var(--contrast-text-color)]", false);
            }
            console.log(newValue);
        } else if (name === "pagetitle") {
            this.title = newValue;
            this.querySelector("h3").innerText = newValue;
            console.log(newValue);
        }
    }
}

customElements.define("nav-item", NavItem);
