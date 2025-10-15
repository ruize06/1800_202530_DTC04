class NavItem extends HTMLElement {

    static get observedAttributes() {
        return [`active`]
    }

    constructor() {
        super()
        this.active = false
        this.content = this.innerHTML
        this.render()
    }
    render() {
        this.innerHTML = `
        <div class = "${this.active ? 'text-gray-300' : 'text-gray-500'} hover:text-gray-400 rounded-full p-4 transition-all duration-200">
        ${this.content}
        </div>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "active") {
            // switch (newValue) {
            //     case "true":
            //         this.active = true
            //     case "false":
            //         this.active = false
            //     default:
            //         console.log("active should be true or false but isn't")
            // }
            this.active = newValue
            console.log(newValue)
            this.render()
        }
    }
}

customElements.define("nav-item", NavItem);