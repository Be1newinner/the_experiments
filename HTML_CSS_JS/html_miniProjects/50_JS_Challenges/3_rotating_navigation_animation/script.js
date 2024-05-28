window.addEventListener('DOMContentLoaded',()=>{


const navButton = document.querySelector("#navButton");
const documentBody = document.querySelector(".body");
navButton.addEventListener('click', ()=> {
    documentBody.classList.toggle('Active');
    navButton.classList.toggle('active2');
});











});