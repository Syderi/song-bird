
import birdsData from "./data/_birdsData_en"
import {createGameCard} from "./_create_gallery"


console.log(createGameCard)

const gamePlayWrapper = document.querySelector(".game__play__wrapper")

const gameCardgame = createGameCard(birdsData,37)

gamePlayWrapper.insertBefore(gameCardgame, gamePlayWrapper.children[1])