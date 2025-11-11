
class SearchAddResult extends HTMLElement {
  static get observedAttributes() {
    return ["added", "resultTitle"];
  }
    constructor () {
        this.added = false
        this.resultTitle = ""
        this.render()
    }

    render() {
        this.innerHTML = `
        <div class="bg-gray p-2 rounded flex justify-between items-center">
            <h1 class="searchResultTitle text-[var(--contrast-text-color)] text-xl font-semibold">
            <h1>
            <button class="searchResultAddButton px-3 py-1 rounded-full text-sm text-[var(--contrast-text-color)] bg-[var(--primary-button-bg-color)] hover:bg-[var(--secondary-button-bg-color)]">
            </button>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "added") {
            _button = this.getElementsByClassName("searchResultAddButton")[0]
            if (newValue in ("true", true)) {
                _button.classList.remove("bg-[var(--primary-button-bg-color)]", "hover:bg-[var(--secondary-button-bg-color)]")
                _button.classList.add("bg-[var(--deactive-button-bg-color)]")
                _button.innerText = "Added"
            } else {
                _button.classList.add("bg-[var(--primary-button-bg-color)]", "hover:bg-[var(--secondary-button-bg-color)]")
                _button.classList.remove("bg-[var(--deactive-button-bg-color)]")
                _button.innerText = "Add"
            }
        } else if (name === "resultTitle") {
            this.getElementsByClassName("searchResultTitle")[0].innerText = newValue
        }
    }
}

customElements.define("search-add-result", SearchAddResult);