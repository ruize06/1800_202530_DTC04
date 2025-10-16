class SiteNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="text-white flex justify-between items-center font-bold">
                <div class="ml-10 hidden md:inline">
                    <a href="index.html" class="p-2 hover:underline">Home</a>
                    <a href="/index.html#footer" class="p-2 hover:underline">About Us</a>
                </div>
                <div>
                    <a href="index.html" class="relative inline-block group">
                    <img src="./images/logo.svg" alt="Orbit Logo"
                    class="h-45 w-auto transition-opacity duration-300 group-hover:opacity-0" />
                    <img src="./images/logohover.svg" alt="Orbit Logo Hover"
                    class="h-45 w-auto absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </a>
                </div>
                <a href="login.html" class="mr-10 p-2 hover:underline">SignUp/Login</a>
            </nav>
        `;
    }
}

customElements.define('site-navbar', SiteNavbar);