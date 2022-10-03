import animals from '../../assets/js/animals.js'

console.log('Hello')
console.log(animals)

const imgCardPanda = document.querySelector('.img_card_panda')
const sliderCards = document.querySelector('.slider__cards')


imgCardPanda.src = animals[0].image;


function createCard (params) {
   let sliderCard = document.createElement('div');
   sliderCard.classList.add('slider__card')
   sliderCards.append(sliderCard)

   let imgCard = document.createElement('img');
   imgCard
}

createCard()