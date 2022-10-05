import dataAnimals from "../../assets/js/dataAnimals.js";
import dataTestimonials from "../../assets/js/dataTestimonials.js";

// console.log(dataAnimals);
// console.log(dataTestimonials);

// start Slider Pets

const sliderCards = document.querySelector(".slider__cards");
const sliderArrowRight = document.querySelector(".slider__arrow_right");
const sliderArrowLeft = document.querySelector(".slider__arrow_left");

const sliderCardsLeft = document.querySelector(".slider__cards_left");
const sliderCardsCenter = document.querySelector(".slider__cards_center");
const sliderCardsRight = document.querySelector(".slider__cards_right");

const testimonialsCards = document.querySelector(".testimonials__cards");
const testimonialsInput = document.querySelector(".testimonials__input");

// let windowInnerWidth = document.documentElement.clientWidth;
let windowInnerWidth = window.innerWidth;

let bgBlockControls = true;

const startCardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let shuffleCardArray = [];
let centrCardArray = [];
let leftRightCardArray = [];
let countStepCardArray = 6;

testimonialsInput.value = 0;
testimonialsInput.min = 0;
testimonialsInput.max = 7;
testimonialsInput.step = 1;

let stapTransformTestimonials = 100 / 4;

function updateCountStepCardArray() {
  if (windowInnerWidth >= 1000) {
    countStepCardArray = 6;
  } else if (windowInnerWidth > 630 && windowInnerWidth < 1000) {
    countStepCardArray = 4;
  } else {
    countStepCardArray = 2;
  }
  // return countStepCardArray;
}
updateCountStepCardArray();

function UpdateStapTransformTestimonials() {
  if (windowInnerWidth > 1280) {
    stapTransformTestimonials = 100 / 4;
  } else {
    stapTransformTestimonials = 100 / 3;
  }
}
UpdateStapTransformTestimonials();

function updatetesTimonialsInputMax() {
  if (windowInnerWidth > 1280) {
    testimonialsInput.max = 7;
  } else {
    testimonialsInput.max = 8;
  }
}
updatetesTimonialsInputMax();

// Начало от ширины экрана количество карточек
window.addEventListener("resize", function () {
  // windowInnerWidth = document.documentElement.innerWidth;
  windowInnerWidth = window.innerWidth;
  testimonialsInput.value = 0;
  testimonialsCards.style.transform = `translateX(0)`;
  updateCountStepCardArray();
  UpdateStapTransformTestimonials();
  updatetesTimonialsInputMax();

  // console.log(stapTransformTestimonials)
  // console.log(testimonialsInput.max)

  //   startgenerareArraysCards()
  sliderCardsLeft.innerHTML = "";
  sliderCardsCenter.innerHTML = "";
  sliderCardsRight.innerHTML = "";
  startgenerareArraysCards();
  addCardsFromArray(centrCardArray, addSliderCardsCenter);
  addCardsFromArray(leftRightCardArray, addSliderCardsLeftAndRight);

  // console.log("countStepCardArray", countStepCardArray);
  // console.log("windowInnerWidth", windowInnerWidth);
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
  shuffleCardArray = shuffle(shuffleCardArray);
  centrCardArray = shuffleCardArray.splice(0, countStepCardArray);
  leftRightCardArray = shuffleCardArray.splice(0, countStepCardArray);
  // console.log("shuffleCardArray", shuffleCardArray);
  // console.log("centrCardArray", centrCardArray);
  // console.log("leftRightCardArray", leftRightCardArray);
}
startgenerareArraysCards();

// Конец формируем массивы карточек

//  Начало заполнения карточек

function addCardsFromArray(array, cardFunction) {
  array.forEach((id, index, array) => {
    cardFunction(id);
  });
}

function addSliderCardsLeftAndRight(id) {
  sliderCardsLeft.append(createCard(id));
  if (windowInnerWidth > 630) {
    sliderCardsRight.append(createCard(id));
  }
}

function addSliderCardsCenter(id) {
  sliderCardsCenter.append(createCard(id));
}

addCardsFromArray(centrCardArray, addSliderCardsCenter);
addCardsFromArray(leftRightCardArray, addSliderCardsLeftAndRight);

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
  // console.log("------------------------------------------");
  if (
    e.target.className === "slider__cards" &&
    e.propertyName === "transform"
  ) {
    setTimeout(() => {
      bgBlockControls = true;
    }, 50);
    sliderCardsCenter.innerHTML = "";
    addCardsFromArray(leftRightCardArray, addSliderCardsCenter);
    sliderCards.style.transitionDuration = "0s";
    sliderCards.style.transform = `translateX(${0}%)`;

    shuffleCardArray = Array.from(
      new Set(shuffleCardArray.concat(centrCardArray))
    );
    shuffleCardArray = shuffle(shuffleCardArray);
    // console.log("shuffleCardArray end trans", shuffleCardArray);

    centrCardArray = leftRightCardArray.slice(0);
    leftRightCardArray = shuffleCardArray.splice(0, countStepCardArray);
    // console.log("centrCardArray end trans", centrCardArray);
    // console.log("leftRightCardArray end trans", leftRightCardArray);
    // console.log("shuffleCardArray end trans 222", shuffleCardArray);
    sliderCardsLeft.innerHTML = "";
    sliderCardsRight.innerHTML = "";
    addCardsFromArray(leftRightCardArray, addSliderCardsLeftAndRight);
  }
});

sliderArrowRight.addEventListener("click", () => {
  if (bgBlockControls) {
    sliderCards.style.transitionDuration = "1.5s";
    sliderCards.style.transform = `translateX(${-100}%)`;
  }
});

sliderArrowLeft.addEventListener("click", () => {
  if (bgBlockControls) {
    sliderCards.style.transitionDuration = "1.5s";
    sliderCards.style.transform = `translateX(${100}%)`;
  }
});

function createCard(id) {
  let sliderCard = document.createElement("div");
  sliderCard.classList.add("slider__card");
  // sliderCards.append(sliderCard)

  let imgCard = document.createElement("img");
  imgCard.src = dataAnimals[id].image;
  sliderCard.append(imgCard);

  let sliderCardWrapper = document.createElement("div");
  sliderCardWrapper.classList.add("slider__card__wrapper");
  sliderCard.append(sliderCardWrapper);

  let divWrapperNull = document.createElement("div");
  sliderCardWrapper.append(divWrapperNull);

  let sliderCardTitle = document.createElement("h5");
  sliderCardTitle.classList.add("slider__card__title");
  sliderCardTitle.textContent = dataAnimals[id].name;
  divWrapperNull.append(sliderCardTitle);

  let sliderCardDescription = document.createElement("div");
  sliderCardDescription.classList.add("slider__card__description");
  sliderCardDescription.textContent = dataAnimals[id].location;
  divWrapperNull.append(sliderCardDescription);

  let sliderCardImg = document.createElement("div");
  sliderCardImg.classList.add("slider__card__img");
  sliderCardWrapper.append(sliderCardImg);

  let sliderCardEat = document.createElement("img");
  sliderCardEat.src = dataAnimals[id].meal;
  sliderCardImg.append(sliderCardEat);

  return sliderCard;
}

// End Slider Pets

// START testimonials Slider

// Начало заполнения карточками отзыва контейнера

dataTestimonials.forEach((id, index, array) => {
  testimonialsCards.append(createTestimonialCard(index));
});

// Конец заполнения карточками отзыва контейнера

// Начало генерации карточек отзывов
function createTestimonialCard(id) {
  let sliderTestimonialCard = document.createElement("div");
  sliderTestimonialCard.classList.add("testimonials__card");
  // sliderCards.append(sliderCard)

  let testimonialsCardHeader = document.createElement("div");
  testimonialsCardHeader.classList.add("testimonials__card__header");
  sliderTestimonialCard.append(testimonialsCardHeader);

  let imgTestimonialCard = document.createElement("img");
  imgTestimonialCard.src = dataTestimonials[id].logo;
  testimonialsCardHeader.append(imgTestimonialCard);

  let testimonialsCardHeaderWrapper = document.createElement("div");
  testimonialsCardHeaderWrapper.classList.add(
    "testimonials__card__header__wrapper"
  );
  testimonialsCardHeader.append(testimonialsCardHeaderWrapper);

  let testimonialsName = document.createElement("div");
  testimonialsName.classList.add("testimonials__name");
  testimonialsName.textContent = dataTestimonials[id].name;
  testimonialsCardHeaderWrapper.append(testimonialsName);

  let testimonialData = document.createElement("div");
  testimonialData.classList.add("testimonial__data");
  testimonialsCardHeaderWrapper.append(testimonialData);

  let testimonialDataLocal = document.createElement("div");
  testimonialDataLocal.classList.add("testimonial__data__local");
  testimonialDataLocal.textContent = dataTestimonials[id].location;
  testimonialData.append(testimonialDataLocal);

  let testimonialParagraf = document.createElement("p");
  testimonialParagraf.textContent = "•";
  testimonialData.append(testimonialParagraf);

  let testimonialDataDate = document.createElement("div");
  testimonialDataDate.classList.add("testimonial__data__date");
  testimonialDataDate.textContent = dataTestimonials[id].lastVisit;
  testimonialData.append(testimonialDataDate);

  let testimonialText = document.createElement("div");
  testimonialText.classList.add("testimonial__text");
  testimonialText.textContent = dataTestimonials[id].quote;
  sliderTestimonialCard.append(testimonialText);

  return sliderTestimonialCard;
}
// Конец генерации карточек отзывов



testimonialsInput.addEventListener("input", (e) => {
  let stapTransform = e.target.value;
  // console.log('input', e)
  testimonialsCards.style.transform = `translateX(${
    -stapTransform * stapTransformTestimonials
  }%)`;
});

// testimonialsCards.append(createTestimonialCard(10))

// min="01"
// max="04"
// step="1"
// value="01"

// End testimonials Slider
