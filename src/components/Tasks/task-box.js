class TaskBox extends HTMLElement{
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `
        `;
    }
}

customElements.define("task-box", TaskBox);