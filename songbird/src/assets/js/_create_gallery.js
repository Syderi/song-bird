import birdsDataEN from "../js/data/_birdsData_en"
import birdsDataRU from "../js/data/_birdsData_ru"
import '../audio/Choose_en.mp3'
import '../audio/Choose_ru.mp3'

import { getIndexlanguage } from "./_language"

export function createGameCard(array, idinficator,) {

  let isPlay = false
  let stoptimeupdate = true;
  const index = idinficator - 1;

  const gameCard = document.createElement("div");
  gameCard.classList.add("game__card");
  gameCard.dataset.galleryCard = array[index].id;

  const audio = document.createElement("audio");
  audio.controls = false;
  audio.src = array[index].audio
  audio.volume = 0.5

  let currentAudioVolume = audio.volume * 100

  gameCard.append(audio)

  const gameCardBird = document.createElement("div");
  gameCardBird.classList.add("game__card__bird");

  gameCard.append(gameCardBird)

  const gameCardImage = document.createElement("div");
  gameCardImage.classList.add("game__card__image");

  gameCardBird.append(gameCardImage)

  const gameCardPicture = document.createElement("img");
  gameCardPicture.classList.add("game__card__picture");
  gameCardPicture.src = array[index].image
  gameCardPicture.alt = "bird"

  gameCardImage.append(gameCardPicture)

  const gameСardDescription = document.createElement("div");
  gameСardDescription.classList.add("game__card__description");

  gameCardBird.append(gameСardDescription)

  const gameСardName = document.createElement("h3");
  gameСardName.classList.add("game__card__name");
  gameСardName.textContent = array[index].name

  gameСardDescription.append(gameСardName)

  const gameCardSpecies = document.createElement("h4");
  gameCardSpecies.classList.add("game__card__species");
  gameCardSpecies.textContent = array[index].species;

  gameСardDescription.append(gameCardSpecies)

  const cardAudioWrapper = document.createElement("div");
  cardAudioWrapper.classList.add("card-audio__wrapper");

  gameCard.append(cardAudioWrapper)

  const wraperTime = document.createElement("div");
  wraperTime.classList.add("wraper-time");

  cardAudioWrapper.append(wraperTime)

  const timeSongCard = document.createElement("div");
  timeSongCard.classList.add("time-song");
  timeSongCard.textContent = "0:00"

  wraperTime.append(timeSongCard)

  const timeLongCard = document.createElement("div");
  timeLongCard.classList.add("time-long");
  timeLongCard.textContent = "0:00"

  wraperTime.append(timeLongCard)

  const wrapperPlay = document.createElement("div");
  wrapperPlay.classList.add("wrapper-play");

  cardAudioWrapper.append(wrapperPlay)

  const play = document.createElement("div");
  play.classList.add("play");

  wrapperPlay.append(play)

  const rangeDuration = document.createElement("input");
  rangeDuration.classList.add("range_duration");
  rangeDuration.classList.add("range_all");
  rangeDuration.type = "range";
  rangeDuration.min = "0";
  rangeDuration.max = "100";
  rangeDuration.value = "0";

  wrapperPlay.append(rangeDuration)

  const wrapperMute = document.createElement("div");
  wrapperMute.classList.add("wrapper-mute");

  cardAudioWrapper.append(wrapperMute)

  const mute = document.createElement("div");
  mute.classList.add("mute");

  wrapperMute.append(mute)

  const rangeVolume = document.createElement("input");
  rangeVolume.classList.add("range_volume");
  rangeVolume.classList.add("range_all");
  rangeVolume.type = "range";
  rangeVolume.min = "0";
  rangeVolume.max = "100";
  rangeVolume.value = "50";

  wrapperMute.append(rangeVolume)

  const descriptionCard = document.createElement("div");
  descriptionCard.classList.add("description-card");
  descriptionCard.textContent = array[index].description;

  gameCard.append(descriptionCard)

  // Функции проигрывателя

  // convert song.currentTime and song.duration into MM:SS format
  function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
      sec = `0${sec}`;
    };
    return `${min}:${sec}`;
  };

  function playAudio() {

    return new Promise(res => {
      if (!isPlay) {
        // audio.currentTime = currentTimeAudio;
        audio.play();
        play.classList.add('play_pause');
        isPlay = !isPlay;
        // currentTimeAudio = audio.currentTime;
      } else {
        audio.pause();
        play.classList.remove('play_pause');
        isPlay = !isPlay;
      };

    })
  };

  audio.addEventListener('loadedmetadata', () => {
    timeLongCard.textContent = (formatTime(Math.floor(audio.duration)));
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.currentTime !== 0) {
      timeSongCard.textContent = (formatTime(Math.floor(audio.currentTime)));
      // rangeDuration.value = (100 / audio.duration) * audio.currentTime;
      // currentTimeAudio = audio.currentTime;
    };
    if (stoptimeupdate) {
      if (audio.currentTime !== 0) {
        rangeDuration.value = (100 / audio.duration) * audio.currentTime;
      };
    }
  });

  audio.addEventListener('ended', () => {
    timeSongCard.textContent = "0:00";
    rangeDuration.value = 0;
    play.classList.remove('play_pause');
    isPlay = false;
  });

  rangeDuration.addEventListener('mouseout', (e) => {
    stoptimeupdate = true;
  });

  rangeDuration.addEventListener('mouseover', (e) => {
    stoptimeupdate = false;
  });

  rangeDuration.onchange = function () {
    audio.currentTime = (rangeDuration.value * audio.duration) / 100

  }

  mute.onclick = function () {
    if (!audio.muted) {
      mute.classList.add('mute_pause');
      audio.muted = true;
      rangeVolume.value = 0
    } else {
      mute.classList.remove('mute_pause');
      audio.muted = false;
      rangeVolume.value = currentAudioVolume
    }
  }

  rangeVolume.addEventListener('change', (e) => {
    if (e.target.value === "0") {
      mute.classList.add('mute_pause');
      audio.muted = true;
      audio.volume = 0;
    } else {
      mute.classList.remove('mute_pause');
      audio.muted = false;
      audio.volume = rangeVolume.value / 100;
      currentAudioVolume = audio.volume * 100
    }
  });

  play.onclick = async function () {
    // audio.play()
    await playAudio()
  }

  // Конец функция проигрователя

  return gameCard

}

export function createGallery() {
  console.log("getIndexlanguageSelectLocalStorage", getIndexlanguage())

  let languageArray = [birdsDataRU, birdsDataEN]
  let curentArray = languageArray[getIndexlanguage()]
  // console.log("languageArray",languageArray[getIndexlanguage()])
  const mainGallery = document.querySelector(".main__gallery")
  mainGallery.innerHTML = ""
  for (let index = 0; index < 36; index++) {
    mainGallery.append(createGameCard(curentArray, index + 1))
  }
}

createGallery()
