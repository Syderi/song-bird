import "./assets/js/_addFavicon";


import "../index.html";
import "./style.scss";

const langSelect = document.getElementById("lang")
console.log(langSelect)


langSelect.addEventListener("change", () => {
console.log(langSelect.value)
})