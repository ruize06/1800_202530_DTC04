class SiteNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="text-white flex justify-between items-center font-bold p-4">
                <div class="inline md:inline sm:hidden">
                    <a href="index.html" class="p-2 inline md:inline sm:hidden hover:underline">Home</a>
                    <a href="/index.html#footer" class="p-2 hidden md:inline sm:hidden hover:underline">About Us</a>
                </div>
                <div class="hidden sm:inline">
                    <a href="index.html" class="relative inline-block group">
                    <img src="./images/logo.svg" alt="Orbit Logo"
                    class="h-15 w-auto transition-opacity duration-300 group-hover:opacity-0" />
                    <img src="./images/logohover.svg" alt="Orbit Logo Hover"
                    class="h-15 w-auto absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </a>
                </div>
                <a href="login.html" class="p-2 hover:underline">SignUp/Login</a>
            </nav>
        `;
    }
}

customElements.define('site-navbar', SiteNavbar);