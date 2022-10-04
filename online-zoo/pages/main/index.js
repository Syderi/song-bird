import animals from "../../assets/js/animals.js";

console.log(animals);

// start Slider Pets

const sliderCards = document.querySelector(".slider__cards");
const sliderArrowRight = document.querySelector(".slider__arrow_right");
const sliderArrowLeft = document.querySelector(".slider__arrow_left");

const sliderCardsLeft = document.querySelector(".slider__cards_left");
const sliderCardsCenter = document.querySelector(".slider__cards_center");
const sliderCardsRight = document.querySelector(".slider__cards_right");

let windowInnerWidth = document.documentElement.clientWidth;

let bgBlockControls = true;

const startCardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let shuffleCardArray = []
let centrCardArray = [];
let leftRightCardArray = [];
let countStepCardArray = 6;

// Начало от ширины экрана количество карточек
window.addEventListener("resize", function () {
  windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth >= 1000) {
    countStepCardArray = 6;
  } else if (windowInnerWidth > 630 && windowInnerWidth < 1000) {
    countStepCardArray = 4;
  } else {
   countStepCardArray = 2;
   // sliderCardsRight.innerHTML=''
   // sliderCardsLeft.innerHTML=''
  }

//   startgenerareArraysCards()
sliderCardsLeft.innerHTML=''
sliderCardsCenter.innerHTML=''
sliderCardsRight.innerHTML=''
startgenerareArraysCards()
  addCardsFromArray(centrCardArray,addSliderCardsCenter)
addCardsFromArray(leftRightCardArray,addSliderCardsLeftAndRight)

  console.log("countStepCardArray", countStepCardArray);
  console.log("windowInnerWidth", windowInnerWidth);
});
// Конец от ширины экрана количество карточек

// Начало Функция перемешивания массива
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// Конец Функция перемешивания массива

// Начало формируем массивы карточек

function startgenerareArraysCards(params) {
   shuffleCardArray = startCardArray.slice(0);
   shuffleCardArray=shuffle(shuffleCardArray)
   centrCardArray = shuffleCardArray.splice(0, countStepCardArray);
   leftRightCardArray = shuffleCardArray.splice(0, countStepCardArray);
   console.log('shuffleCardArray',shuffleCardArray)
   console.log('centrCardArray',centrCardArray)
   console.log('leftRightCardArray',leftRightCardArray)
}
startgenerareArraysCards()

// console.log('shuffleCardArray',shuffleCardArray)
// console.log('centrCardArray',centrCardArray)
// console.log('leftRightCardArray',leftRightCardArray)
// console.log('shuffleCardArray',shuffleCardArray)
// Конец формируем массивы карточек

//  Начало заполнения карточек


function addCardsFromArray(array,cardFunction) {
   array.forEach((id, index, array) => {
      cardFunction(id);
   });
}

function addSliderCardsLeftAndRight(id) {
  sliderCardsLeft.append(createCard(id));
  sliderCardsRight.append(createCard(id));
}

function addSliderCardsCenter(id) {
  sliderCardsCenter.append(createCard(id));
}

addCardsFromArray(centrCardArray,addSliderCardsCenter)
addCardsFromArray(leftRightCardArray,addSliderCardsLeftAndRight)

// Конец заполнения карточек

sliderCards.addEventListener("transitionstart", (e) => {
  if (
    e.target.className === "slider__cards" &&
    e.propertyName === "transform"
    ) {
    setTimeout(() => {
      bgBlockControls = false;
   }, 50);
}
});

sliderCards.addEventListener("transitionend", (e) => {
   console.log('------------------------------------------')
   if (
      e.target.className === "slider__cards" &&
      e.propertyName === "transform"
      ) {
         setTimeout(() => {
            bgBlockControls = true;
         }, 50);
         sliderCardsCenter.innerHTML = "";
         addCardsFromArray(leftRightCardArray,addSliderCardsCenter)
         sliderCards.style.transitionDuration = '0s'
         sliderCards.style.transform = `translateX(${0}%)`;

         shuffleCardArray = Array.from(new Set(shuffleCardArray.concat(centrCardArray)));
         shuffleCardArray=shuffle(shuffleCardArray)
         console.log('shuffleCardArray end trans', shuffleCardArray)

         centrCardArray = leftRightCardArray.slice(0);
         leftRightCardArray = shuffleCardArray.splice(0, countStepCardArray);
         console.log('centrCardArray end trans', centrCardArray)
         console.log('leftRightCardArray end trans', leftRightCardArray)
         console.log('shuffleCardArray end trans 222', shuffleCardArray)
         sliderCardsLeft.innerHTML = "";
         sliderCardsRight.innerHTML = "";
         addCardsFromArray(leftRightCardArray,addSliderCardsLeftAndRight)

         
         
  }
});

sliderArrowRight.addEventListener("click", () => {
   if (bgBlockControls) {
      sliderCards.style.transitionDuration = '1.5s'
      sliderCards.style.transform = `translateX(${-100}%)`;
   }
});

sliderArrowLeft.addEventListener("click", () => {
   if (bgBlockControls) {
      sliderCards.style.transitionDuration = '1.5s'
      sliderCards.style.transform = `translateX(${100}%)`;
   }
});

function createCard(id) {
  let sliderCard = document.createElement("div");
  sliderCard.classList.add("slider__card");
  // sliderCards.append(sliderCard)

  let imgCard = document.createElement("img");
  imgCard.src = animals[id].image;
  sliderCard.append(imgCard);

  let sliderCardWrapper = document.createElement("div");
  sliderCardWrapper.classList.add("slider__card__wrapper");
  sliderCard.append(sliderCardWrapper);

  let divWrapperNull = document.createElement("div");
  sliderCardWrapper.append(divWrapperNull);

  let sliderCardTitle = document.createElement("h5");
  sliderCardTitle.classList.add("slider__card__title");
  sliderCardTitle.textContent = animals[id].name;
  divWrapperNull.append(sliderCardTitle);

  let sliderCardDescription = document.createElement("div");
  sliderCardDescription.classList.add("slider__card__description");
  sliderCardDescription.textContent = animals[id].location;
  divWrapperNull.append(sliderCardDescription);

  let sliderCardImg = document.createElement("div");
  sliderCardImg.classList.add("slider__card__img");
  sliderCardWrapper.append(sliderCardImg);

  let sliderCardEat = document.createElement("img");
  sliderCardEat.src = animals[id].meal;
  sliderCardImg.append(sliderCardEat);

  return sliderCard;
}

// End Slider Pets
