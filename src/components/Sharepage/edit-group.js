document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('editGroupPopup');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const saveBtn = document.getElementById('saveEditBtn');
    const nameInput = document.getElementById('groupNameInput');

    let activeGroup = null;

    document.querySelectorAll('.editGroupBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            activeGroup = event.target.closest('.group');

            const title = activeGroup.querySelector('.groupTitle').textContent;

            nameInput.value = title;

            popup.classList.remove('hidden');
        });
    });

    cancelBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
        activeGroup = null;
    });

    saveBtn.addEventListener('click', () => {
        if (activeGroup) {
            activeGroup.querySelector('.groupTitle').textContent = nameInput.value;
        }

        popup.classList.add('hidden');
        activeGroup = null;
    });
});



