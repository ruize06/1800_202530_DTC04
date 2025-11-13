import { auth } from "/src/firebaseConfig.js";
import {onAuthStateChanged} from "firebase/auth";

function setup() {
    onAuthStateChanged (auth, (user) => {
        if (!user && (window.location.pathname != "/index.html" && window.location.pathname != "/login.html")) {
            window.location.href = "/index.html";
        }
    })
}

document.addEventListener('DOMContentLoaded', setup);