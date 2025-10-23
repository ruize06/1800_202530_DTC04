class NavItem extends HTMLElement {
    static get observedAttributes() {
        return [`active`];
    }

    constructor() {
        super();
        this.active = false;
        this.content = this.innerHTML;
        this.render();
    }

    render() {
        this.classList.toggle("text-gray-500", true);
        this.innerHTML = `
        <div class = "hover:text-gray-400
            rounded-full p-4 [&_svg]:w-[20vw] [&_svg]:max-w-[50px] [&_svg]:h-auto transition-all duration-200">
        ${this.content}
        </div>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "active") {
            this.active = newValue;
            if (this.active == "true") {
                this.classList.toggle("text-gray-300", true);
                this.classList.toggle("text-gray-500", false);
            } else {
                console.log("here");
                this.classList.toggle("text-gray-500", true);
                this.classList.toggle("text-gray-300", false);
            }
            console.log(newValue);
        }
    }
}

customElements.define("nav-item", NavItem);
