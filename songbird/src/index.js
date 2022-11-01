import "../index.html";
import "./style.scss";


import "./assets/js/_addFavicon";
import "./assets/js/_preload";
import "./assets/js/_create_gallery";

// console.log(galleryCard)

const langSelect = document.getElementById("lang")
console.log(langSelect)


langSelect.addEventListener("change", () => {
console.log(langSelect.value)
})
