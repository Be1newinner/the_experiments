document.addEventListener('DOMContentLoaded',()=>{

const prev = document.getElementsByClassName("prev")[0];     
const next = document.getElementsByClassName("next")[0];
const lines = document.querySelectorAll(".line");
const circles = document.querySelectorAll(".circle");

  prev.addEventListener('click',prevFunc);
  next.addEventListener('click',nextFunc);

    var state = 1;
    function nextFunc(){
        if(state < 4){
            state++;
                    lines[state-2].classList.add('activeBack');
                    lines[state-2].style.backgroundPosition =  'left';
                    circles[state-1].classList.add("active");
                   }
        next.classList.add('activeBack');
        prev.classList.remove('activeBack');
    }

    function prevFunc(){
        if(state > 1){
            state--;
                    lines[state-1].classList.remove('activeBack');
                    lines[state-1].style.backgroundPosition =  'right';
                    circles[state].classList.remove("active");
            }
        prev.classList.add('activeBack');
        next.classList.remove('activeBack');
    }

});