let windowInnerWidthDonate = window.innerWidth;
const donateRangeInput = document.querySelector(".donate__range__input");
const donateCashInput = document.querySelector(".donate__cash");
let donateDollarsULWrapper =
  document.querySelector(".donate__dollars").children;
let donateLabelULWrapper = document.querySelector(
  ".donate__range_label__container"
).children;

let donateDollars = 100;
donateCashInput.value = donateDollars;

// Начало Функция оновления значений импута ренджа

function updateDonateRangeInput() {
  if (windowInnerWidthDonate > 1280) {
    donateRangeInput.max = 7;
    donateRangeInput.value = 5;
  } else if (windowInnerWidthDonate <= 1280 && windowInnerWidthDonate > 960) {
    donateRangeInput.max = 6;
    donateRangeInput.value = 4;
  } else if (windowInnerWidthDonate <= 960) {
    donateRangeInput.max = 4;
    donateRangeInput.value = 2;
  }
}
updateDonateRangeInput();
// Конец Функция оновления значений импута ренджа

// Начало Функция назначения долларов импута ренджа

function updatedonateDollars() {
  if (windowInnerWidthDonate > 1280) {
    switch (donateRangeInput.value) {
      case "0":
        donateDollars = 5000;
        break;
      case "1":
        donateDollars = 2000;
        break;
      case "2":
        donateDollars = 1000;
        break;
      case "3":
        donateDollars = 500;
        break;
      case "4":
        donateDollars = 250;
        break;
      case "5":
        donateDollars = 100;
        break;
      case "6":
        donateDollars = 50;
        break;
      case "7":
        donateDollars = 25;
        break;
    }
  } else if (windowInnerWidthDonate <= 1280 && windowInnerWidthDonate > 960) {
    switch (donateRangeInput.value) {
      case "0":
        donateDollars = 2000;
        break;
      case "1":
        donateDollars = 1000;
        break;
      case "2":
        donateDollars = 500;
        break;
      case "3":
        donateDollars = 250;
        break;
      case "4":
        donateDollars = 100;
        break;
      case "5":
        donateDollars = 50;
        break;
      case "6":
        donateDollars = 25;
        break;
    }
  } else if (windowInnerWidthDonate <= 960) {
    switch (donateRangeInput.value) {
      case "0":
        donateDollars = 500;
        break;
      case "1":
        donateDollars = 250;
        break;
      case "2":
        donateDollars = 100;
        break;
      case "3":
        donateDollars = 50;
        break;
      case "4":
        donateDollars = 25;
        break;
    }
  }
}
updatedonateDollars();

function updatedonateDollarsRevers() {
  if (windowInnerWidthDonate > 1280) {
    switch (donateCashInput.value) {
      case "5000":
        donateRangeInput.value = "0";
        break;
      case "2000":
        donateRangeInput.value = "1";
        break;
      case "1000":
        donateRangeInput.value = "2";
        break;
      case "500":
        donateRangeInput.value = "3";
        break;
      case "250":
        donateRangeInput.value = "4";
        break;
      case "100":
        donateRangeInput.value = "5";
        break;
      case "50":
        donateRangeInput.value = "6";
        break;
      case "25":
        donateRangeInput.value = "7";
        break;
      default:
        donateRangeInput.value = "6";
    }
  } else if (windowInnerWidthDonate <= 1280 && windowInnerWidthDonate > 960) {
    switch (donateCashInput.value) {
      case "2000":
        donateRangeInput.value = "0";
        break;
      case "1000":
        donateRangeInput.value = "1";
        break;
      case "500":
        donateRangeInput.value = "2";
        break;
      case "250":
        donateRangeInput.value = "3";
        break;
      case "100":
        donateRangeInput.value = "4";
        break;
      case "50":
        donateRangeInput.value = "5";
        break;
      case "25":
        donateRangeInput.value = "6";
        break;
      default:
        donateRangeInput.value = "4";
    }
  } else if (windowInnerWidthDonate <= 960) {
    switch (donateCashInput.value) {
      case "500":
        donateRangeInput.value = "0";
        break;
      case "250":
        donateRangeInput.value = "1";
        break;
      case "100":
        donateRangeInput.value = "2";
        break;
      case "50":
        donateRangeInput.value = "3";
        break;
      case "25":
        donateRangeInput.value = "4";
        break;
      default:
        donateRangeInput.value = "2";
    }
  }
}
updatedonateDollarsRevers();
// Конец Функция Функция назначения долларов импута ренджа

// Начало функция ширины экрана
window.addEventListener("resize", function () {
  donateCashInput.value = donateDollars;
  windowInnerWidthDonate = window.innerWidth;
  updateDonateRangeInput();
  updatedonateDollarsRevers();
  addColorDollars();
});
// Конец Начало функция ширины экрана

//  Начало отслеживания ренджа
donateRangeInput.addEventListener("input", (e) => {
  updatedonateDollars();
  addColorDollars();

  donateCashInput.value = donateDollars;
});

//  Конец отслеживания ренджа

//  Начало импута долларов
donateCashInput.addEventListener("input", (e) => {
  if (donateCashInput.value.length > 4) {
    donateCashInput.value = donateCashInput.value.slice(0, 3);
  }
  let inputValue = donateCashInput.value.replace(/[e,+,-]/g, '');
  donateCashInput.value = inputValue;

  updatedonateDollarsRevers();
  addColorDollars();
});

//  Конец импута долларов

// Начало коллекция техста долларов

function addColorDollars() {
  let rangeValue = Number(donateRangeInput.value);
  if (windowInnerWidthDonate > 1280) {
    rangeValue = Number(donateRangeInput.value);
  } else if (windowInnerWidthDonate <= 1280 && windowInnerWidthDonate > 960) {
    rangeValue = Number(donateRangeInput.value) + 1;
  } else if (windowInnerWidthDonate <= 960) {
    rangeValue = Number(donateRangeInput.value) + 3;
  }

  for (let i = 0; i < donateDollarsULWrapper.length; i++) {
    donateDollarsULWrapper[i].classList.remove("donate__value__wrapper_active");
    donateDollarsULWrapper[rangeValue].classList.add("donate__value__wrapper_active");

    donateLabelULWrapper[i].classList.remove("donate__range_label_active");
    donateLabelULWrapper[rangeValue].classList.add(
      "donate__range_label_active"
    );
  }
}
addColorDollars();

// Конец коллекция текста долларов
