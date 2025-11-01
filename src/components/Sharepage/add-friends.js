document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('addFriendsPopup');
    const addFriendsBtn = document.getElementById('addFriendsBtn')
    const cancelBtn = document.getElementById('cancelBtn')

    addFriendsBtn.addEventListener('click', () => {
        popup.classList.remove('hidden');
    })

    cancelBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
    })
})