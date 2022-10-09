// console.log('Hello from popup')

const popupClicks = document.querySelectorAll('.popup-click');
const popup = document.querySelector('.popup');
// console.log(popupClicks)



popupClicks.forEach(popupClick => {
    popupClick.addEventListener('click', () => {
        popup.classList.toggle('popup-active')
    })
})
