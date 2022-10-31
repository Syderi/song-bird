import "./assets/js/_addFavicon";
import "./assets/js/_preload";


import "../index.html";
import "./style.scss";

const langSelect = document.getElementById("lang")
console.log(langSelect)


langSelect.addEventListener("change", () => {
console.log(langSelect.value)
})
