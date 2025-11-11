
class SearchAddResult extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'added'];
    }
    constructor () {
        super()
    }
    
    render() {
        this.innerHTML = `
        <div class="bg-[var(--bg-color)] px-3 py-2 rounded-full flex justify-between items-center">
            <h1 class="searchResultTitle text-[var(--text-color)] text-xl font-semibold">
            </h1>
            <button class="searchResultAddButton px-3 py-1 rounded-full text-sm text-[var(--contrast-text-color)] bg-[var(--primary-button-bg-color)] hover:bg-[var(--secondary-button-bg-color)]">
            </button>
        </div>
        `;
    }
    
    connectedCallback() {
        this.render()
        this.setAttribute("added", false)
        this.setAttribute("title", "")
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "added") {
            if (newValue === "true" || newValue === true) {
                const _button = this.getElementsByClassName("searchResultAddButton")[0]
                _button.classList.remove("bg-[var(--primary-button-bg-color)]", "hover:bg-[var(--secondary-button-bg-color)]")
                _button.classList.add("bg-[var(--deactive-button-bg-color)]")
                _button.innerText = "Added"
            } else {
                const _button = this.getElementsByClassName("searchResultAddButton")[0]
                _button.classList.add("bg-[var(--primary-button-bg-color)]", "hover:bg-[var(--secondary-button-bg-color)]")
                _button.classList.remove("bg-[var(--deactive-button-bg-color)]")
                _button.innerText = "Add"
            }
        } else if (name === "title") {
            this.getElementsByClassName("searchResultTitle")[0].innerHTML = newValue
        }
    }
}

customElements.define("search-add-result", SearchAddResult);