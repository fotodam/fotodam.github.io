document.addEventListener('DOMContentLoaded', () => {
    let menuToggle = document.querySelector('button[data-toggle=mobile-dropdown]');
    let menu = document.querySelector('#mobile-dropdown');
    menu.addEventListener('click', () => {
        menu.classList.toggle('is-open');
    });
    menuToggle.addEventListener('click', ()=> {
        menu.classList.toggle('is-open');
    });
});