document.addEventListener("DOMContentLoaded", function(){
  
const cards = document.querySelectorAll(".cards"); 

cards.forEach((card)=>{
  card.addEventListener('click',()=>{
    cards.forEach((card)=>card.classList.remove('active'));
    card.classList.add('active');
  });
  });

});