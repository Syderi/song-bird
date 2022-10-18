// import '../src/assets/js/_buildhtml'
import {wrapperGame} from './assets/js/_buildhtml'
import "../index.html";
import "./style.scss";

console.log("Hello World!");




wrapperGame.innerHTML ='55'



let radioValue = document.getElementsByName('radio')

radioValue.forEach(element => {
    element.addEventListener('click', ()=> {
        console.log(element.value)
    })
});