class NavItem extends HTMLElement {
    constructor() {
        super()
        this.content = this.innerHTML
        this.render()
    }
    render() {
        this.innerHTML = `
        <div class = "text-gray-900 hover:text-gray-500 hover:bg-gray-800/60 rounded-full p-4 w-fit h-[100%] transition-all duration-250 max-h-fit">
        ${this.content}
        </div>
        `;
    }
}

customElements.define("nav-item", NavItem);