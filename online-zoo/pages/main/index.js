import animals from "../../assets/js/animals.js";

console.log(animals);

// start Slider Pets

const sliderCards = document.querySelector(".slider__cards");
const sliderArrowRight = document.querySelector(".slider__arrow_right");
const sliderArrowLeft = document.querySelector(".slider__arrow_left");

const sliderCardsLeft = document.querySelector(".slider__cards_left");
const sliderCardsCenter = document.querySelector(".slider__cards_center");
const sliderCardsRight = document.querySelector(".slider__cards_right");


let startCardArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

let bgBlockControls = true;


sliderCards.addEventListener('transitionstart',() =>{
   bgBlockControls = false;
})

sliderCards.addEventListener("transitionend", (e) => {
   console.log(e)
  if (
    e.target.className === "slider__cards" &&
    e.propertyName === "transform"
  ) {
   setTimeout(() => {
      
      bgBlockControls = true;
   }, 50);
  }
});

sliderArrowRight.addEventListener("click", () => {
  if (bgBlockControls) {
   //   bgBlockControls = false;
    sliderCards.style.transform = `translateX(${-100}%)`;
   //  setTimeout(() => {
   //  }, 1);
  }
});

sliderArrowLeft.addEventListener("click", () => {
  if (bgBlockControls) {
   //   bgBlockControls = false;
    sliderCards.style.transform = `translateX(${100}%)`;
   //  setTimeout(() => {
   //  }, 1);
  }
});



function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffleCardArray = shuffle(startCardArray)
console.log(shuffleCardArray)


shuffleCardArray.forEach((id,index,array) => {
   if (index<=5) {
      addSliderCardsLeftAndRight(id)
   }
   if (index>5 && index<=11) {
      addSliderCardsCenter(id)
   }

});



function addSliderCardsLeftAndRight(id) {
   sliderCardsLeft.append(createCard(id))
   sliderCardsRight.append(createCard(id))
}

function addSliderCardsCenter(id) {
   sliderCardsCenter.append(createCard(id))
}




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

// sliderCardsCenter.append(createCard(0));
// sliderCardsCenter.append(createCard(1));
// sliderCardsCenter.append(createCard(2));
// sliderCardsCenter.append(createCard(3));
// sliderCardsCenter.append(createCard(4))
// sliderCardsCenter.append(createCard(5))

// sliderCardsLeft.append(createCard(6));
// sliderCardsLeft.append(createCard(7));
// sliderCardsLeft.append(createCard(8));
// sliderCardsLeft.append(createCard(9));
// sliderCardsLeft.append(createCard(10))
// sliderCardsLeft.append(createCard(11))

// sliderCardsRight.append(createCard(6));
// sliderCardsRight.append(createCard(7));
// sliderCardsRight.append(createCard(8));
// sliderCardsRight.append(createCard(9));
// sliderCardsRight.append(createCard(10))
// sliderCardsRight.append(createCard(11))

// createCard(6)

// End Slider Pets
