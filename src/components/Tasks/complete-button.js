class CompleteButton extends HTMLElement {
    static get observedAttributes() {
        return ["checked"];
    }

    render () {
        this.innerHTML = `
            <div class="complete-icon float-left max-w-[24px] hover:scale-120 transition-transform duration-250 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="incompleteSVG icon icon-tabler icons-tabler-outline icon-tabler-circle">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="currentColor"
                    class="completedSVG hidden icon icon-tabler icons-tabler-filled icon-tabler-circle-check">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                </svg>
            </div>
        `;
    }

    connectedCallback() {
        this.render();
        this.addEventListener("click", () => {
            const completed = this.getAttribute("checked") 
            this.setAttribute("checked", completed == "true" || completed == true ? false: true)
        })
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "checked") {
            if (newValue == true || newValue == "true") {
                console.log("completed")
                this.getElementsByClassName("completedSVG")[0].classList.remove("hidden")
                this.getElementsByClassName("incompleteSVG")[0].classList.add("hidden")
            } else {
                console.log("uncompleted")
                this.getElementsByClassName("incompleteSVG")[0].classList.remove("hidden")
                this.getElementsByClassName("completedSVG")[0].classList.add("hidden")
            }
        }
    }
}

customElements.define("complete-button", CompleteButton);