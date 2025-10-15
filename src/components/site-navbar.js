class SiteNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="text-white flex justify-between items-center py-3 px-10 font-bold">
                <div class="flex flex-row">
                    <a href="#" class="p-2 hover:underline">Home</a>
                    <a href="#footer" class="p-2 hover:underline">About Us</a>
                </div>
                <a href="#" class="relative inline-block group">
                <img src="./images/logo.svg" alt="Orbit Logo"
                class="h-45 w-auto transition-opacity duration-300 group-hover:opacity-0" />

                <img src="./images/logohover.svg" alt="Orbit Logo Hover"
                class="h-45 w-auto absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
                <a href="login.html" class="p-2 hover:underline">SignUp/Login</a>
            </nav>
        `;
    }
}

customElements.define('site-navbar', SiteNavbar);