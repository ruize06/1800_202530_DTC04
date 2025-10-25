function isLightColor(hexColor) {
    if (hexColor.length == 7) {
      const rgb = [
        parseInt(hexColor.substring(1, 3), 16),
        parseInt(hexColor.substring(3, 5), 16),
        parseInt(hexColor.substring(5), 16),
      ];
      const luminance =
        (0.2126 * rgb[0]) / 255 +
        (0.7152 * rgb[1]) / 255 +
        (0.0722 * rgb[2]) / 255;
      return luminance > 0.5;
    }
    return false
}

class TaskBox extends HTMLElement{
    static get observedAttributes() {
        return ['date', 'time', 'icon', 'color', 'title', 'description'];
    }

    constructor() {
        super();
        this.render();
        for (let attr in this.observedAttributes){
            this.setAttribute(attr, null);
        };
    }

    render() {
        this.innerHTML = `
            <div
                class="task-box flex flex-row justify-between max-w-full h-24 hover:max-h-fit hover:[&_.hidden]:inline rounded-xl p-4 border-4 border-transparent hover:scale-105 transition-transform duration-250">

                <div class="task-description-container flex flex-row items-center space-x-4 max-w-[60%]">

                    <div class="task-icon-container flex-none">
                    </div>

                    <div class="task-title-container">
                        <h1 class="task-title text-2xl font-semibold">
                        </h1>
                        <p class="task-description hidden">
                        </p>
                    </div>
                </div>


                <div class="task-details-container flex flex-col font-bold space-y-2">

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
            this.getElementsByClassName("task-description")[0].textContent = newValue;
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
            if (newValue == "null"){
                // TODO Default color, once Add Task is complete, remove this as an color will be required by default
                console.log("No color provided, setting default.");
                this.getElementsByClassName("task-box")[0].style.color = "#ffffff";
                this.getElementsByClassName("task-box")[0].style.backgroundColor = "#3991ae";
            } else {
                this.getElementsByClassName("task-box")[0].style.backgroundColor = newValue;
                this.getElementsByClassName("task-box")[0].style.color = isLightColor(newValue) ? "#000000": "#ffffff";
            }
        } else if (name === "date" && newValue != null) {
            /**
             * @param {JSON} newValue - JSON string with keys: day, month, year
             */
            newValue = JSON.parse(newValue);
            this.getElementsByClassName("task-date")[0].classList.toggle("hidden", false);
            this.getElementsByClassName("task-day")[0].textContent = newValue["day"].toString().padStart(2, '0');
            this.getElementsByClassName("task-month")[0].textContent = newValue["month"].toString().padStart(2, '0');
            this.getElementsByClassName("task-year")[0].textContent = newValue["year"].toString().padStart(4, '0');
        } else if (name === "time" && newValue != null) {
            /**
             * @param {JSON} newValue - JSON string with keys: hour, minute in 24-hour format
             */
            newValue = JSON.parse(newValue);
            this.getElementsByClassName("task-time")[0].classList.toggle("hidden", false);
            this.getElementsByClassName("task-hour")[0].textContent = newValue["hour"].toString().padStart(2, '0');
            this.getElementsByClassName("task-minute")[0].textContent = newValue["minute"].toString().padStart(2, '0');
        }
    }
}

customElements.define("task-box", TaskBox);