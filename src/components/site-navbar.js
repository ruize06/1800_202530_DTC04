import {
    onAuthStateChanged,
} from "firebase/auth";

import { auth } from '/src/firebaseConfig.js';

class SiteNavbar extends HTMLElement {
    connectedCallback() {
        onAuthStateChanged(auth, (user) => {
            var redirect = user ? "/main.html": "/login.html"; ;

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
                    <a href="${redirect}" id="login-button" class="p-2 hover:underline"></a>
                </nav>
            `;
            var loginButton = document.getElementById("login-button")
            loginButton.textContent = user ? "Continue to Orbit" : "SignUp/Login"
        })
    };
}

customElements.define('site-navbar', SiteNavbar);