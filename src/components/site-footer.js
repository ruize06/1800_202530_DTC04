class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer id="footer" class="text-white p-5 mb-[70px] flex justify-center">
                <div>
                    <section class="relative z-10 space-y-5 mb-4">
                        <h1 class="text-5xl font-bold">Any Questions?</h1>
                        <h2 class="text-xs">
                            Got questions? We've got answers. Reach out to our team of
                            professionals to help you on your journey.
                        </h2>
                    </section>
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white"
                        stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <path
                        d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                    </svg>
                    <h1>Contact us</h1>
                </div>
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 -3 24 24" fill="none" stroke="white"
                        stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                        <path d="M3 7l9 6l9 -6" />
                    </svg>
                    <h1>Email us for business inquiries</h1>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);