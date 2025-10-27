window.view_change = function view_change() {
    const edit_btn = document.getElementById('edit_btn');
    const popup = document.getElementsById('popup');

    edit_btn?.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });
}
