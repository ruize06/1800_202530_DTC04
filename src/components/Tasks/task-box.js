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
        this.className = "flex flex-row max-w-full space-x-4"
        this.innerHTML = `
            <div
                class="task-box shadow-lg flex flex-col md:flex-row justify-between grow hover:scale-105 hover:[&_.task-description]:block rounded-xl p-4 transition-all duration-250">

                <div class="task-description-container flex flex-row space-x-4 md:max-w-[70%]">
                    <!-- no icon for now bc it takes too much space
                    <div class="task-icon-container flex-none">
                    </div>
                    -->

                    <div class="task-title-container h-auto">
                        <h1 class="task-title text-xl font-semibold overflow-hidden text-ellipsis">
                        </h1>
                        <p class="task-description hidden w-full break-all text-wrap overflow-hidden text-ellipsis max-h-[6ch]">
                        </p>
                    </div>
                </div>

                <div class="task-details-container flex flex-row md:flex-col max-w-fit items-end gap-2">
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
        } else if (name === "color") {
            /**
             * @param {string} newValue - string representing color code for bg background
             */
            this.getElementsByClassName("task-box")[0].style.backgroundColor = newValue;
            const textColor = isLightColor(newValue) ? "#000000": "#ffffff";
            this.getElementsByClassName("task-box")[0].style.color = textColor;
            this.style.textDecorationColor = textColor;
            
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