import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('addGroupsPopup');
    const addGroupsBtn = document.getElementById('addGroupsBtn');
    const cancelBtn = document.getElementById('cancelGroupsBtn');


    addGroupsBtn.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
        searchResults.innerHTML = "";
        searchInput.value = "";
    });
});