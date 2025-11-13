import { isLightColor } from '/src/utils.js';

class TaskBox extends HTMLElement{
    static get observedAttributes() {
        return ['date', 'time', 'icon', 'color', 'title', 'description'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        for (let attr in TaskBox.observedAttributes){
            this.setAttribute(TaskBox.observedAttributes[attr], null);
        };
    }

    render() {
        this.classList.add("flex", "flex-row", "max-w-full", "space-x-4")
        this.innerHTML = `
            <div
                class="task-box shadow-lg flex flex-row justify-between grow hover:scale-105 hover:[&_.task-description]:inline rounded-xl p-4 transition-transform duration-250">

                <div class="task-description-container flex flex-row space-x-4 max-w-[70%]">
                    <div class="task-icon-container flex-none">
                    </div>

                    <div class="task-title-container max-w-[90%] h-auto">
                        <h1 class="task-title text-xl font-semibold overflow-hidden text-ellipsis">
                        </h1>
                        <p class="task-description hidden w-full break-all text-wrap">
                        </p>
                    </div>
                </div>

                <div class="task-details-container flex flex-col md:flex-row gap-2 font-bold">
                    <div class="task-date hidden">
                        <span class="task-day"></span> /
                        <span class="task-month"></span> /
                        <span class="task-year"></span>
                    </div>

                    <div class="task-time hidden">
                        <span class="task-hour"></span>:<span class="task-minute"></span>
                    </div>
                </div>
            </div>
        `;
    }

    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "title") {
            /**
             * @param {string} newValue - string representing the task's title
             */
            this.getElementsByClassName("task-title")[0].textContent = newValue;
        } else if (name === "description") {
            /**
             * @param {string} newValue - string representing the task's longer description
             */
            this.getElementsByClassName("task-description")[0].innerHTML = newValue;
        } else if (name === "icon") {
            /**
             * @param {string} newValue - string representing innerHTML of the icon SVG
             */
            if (newValue == "null"){
                // TODO Default icon, once Add Task is complete, remove this as an icon will be required by default
                this.getElementsByClassName("task-icon-container")[0].innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-checklist">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
                        <path d="M14 19l2 2l4 -4" />
                        <path d="M9 8h4" />
                        <path d="M9 12h2" />
                    </svg>
                `;
            } else {
                this.getElementsByClassName("task-icon-container")[0].innerHTML = newValue;
            }
        } else if (name === "color") {
            /**
             * @param {string} newValue - string representing color code for bg background
             */
            this.getElementsByClassName("task-box")[0].style.backgroundColor = newValue;
            this.getElementsByClassName("task-box")[0].style.color = isLightColor(newValue) ? "#000000": "#ffffff";
            
        } else if (name === "date" && newValue !== null && newValue != "null" && newValue != "") {
            /**
             * @param {JSON} newValue - JSON string with keys: day, month, year
             */
            newValue = newValue.split('-');
            this.getElementsByClassName("task-date")[0].classList.toggle("hidden", false);
            // Year
            this.getElementsByClassName("task-year")[0].textContent = newValue[0];
            // Month
            this.getElementsByClassName("task-month")[0].textContent = newValue[1];
            // Day
            this.getElementsByClassName("task-day")[0].textContent = newValue[2];
        } else if (name === "time" && newValue != null && newValue != "null" && newValue != '') {
            /**
             * @param {JSON} newValue - JSON string with keys: hour, minute in 24-hour format
             */
            newValue = newValue.split(":");
            this.getElementsByClassName("task-time")[0].classList.toggle("hidden", false);
            this.getElementsByClassName("task-hour")[0].textContent = newValue[0];
            this.getElementsByClassName("task-minute")[0].textContent = newValue[1];
        }
    }
}

customElements.define("task-box", TaskBox);