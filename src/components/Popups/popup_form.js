
class PopupForm extends HTMLElement {
    static get observedAttributes() {
        return ["title"];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.className = "bg-[var(--secondary-bg-color)] text-[var(--text-color)] outline-none **:focus:outline-none fixed z-100 bottom-0 md:left-1/2 md:-translate-x-1/2 translate-y-full w-full md:max-w-[768px] rounded-t-xl px-8 pb-8 transition-all duration-300"
        this.setAttribute("tabindex", "-1");
        this.innerHTML = `
            <div class="sticky flex flex-row items-center justify-between
                        top-0 bg-inherit py-4 border-b border-[var(--primary-border-color)]">
                <p class="popupTitle text-3xl font-bold">{this.getAttribute("title")}</p>
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
        if (name == "title") {
            this.getElementsByClassName("popupTitle")[0].innerHTML = newValue
        }
    }

    
}