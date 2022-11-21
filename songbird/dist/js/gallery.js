import { birdsData } from "./birdsData.js";

let typeBird = 0;
let birdOrder = 0;

const left = document.querySelector(".gallery__left");
const right = document.querySelector(".gallery__right");

right.addEventListener("click", () => {
  birdOrder++;
  renderGalleryRight();
});

left.addEventListener("click", () => {
  birdOrder--;
  renderGalleryLeft();
});

export function renderGalleryRight() {
  if (birdOrder >= 6) {
    typeBird++;
    birdOrder = 0;
  }
  if ((typeBird == 5) & (birdOrder == 5)) {
    typeBird = 0;
    birdOrder = 0;
  }
  const arrBird = birdsData[typeBird];

  document.querySelector(".gallery__img-photo").src = arrBird[birdOrder].image;
  document.querySelector(".gallery__audio").src = arrBird[birdOrder].audio;
  document.querySelector(".gallery__title-ru").innerHTML =
    arrBird[birdOrder].name;
  document.querySelector(".gallery__title-lat").innerHTML =
    arrBird[birdOrder].species;
  document.querySelector(".gallery__content").innerHTML =
    arrBird[birdOrder].description;
}

export function renderGalleryLeft() {
  if ((typeBird <= 0) & (birdOrder <= 0)) {
    typeBird = 5;
    birdOrder = 5;
  }
  if (birdOrder <= 0) {
    typeBird--;
    birdOrder = 5;
  }
  const arrBird = birdsData[typeBird];

  document.querySelector(".gallery__img-photo").src = arrBird[birdOrder].image;
  document.querySelector(".gallery__audio").src = arrBird[birdOrder].audio;
  document.querySelector(".gallery__title-ru").innerHTML =
    arrBird[birdOrder].name;
  document.querySelector(".gallery__title-lat").innerHTML =
    arrBird[birdOrder].species;
  document.querySelector(".gallery__content").innerHTML =
    arrBird[birdOrder].description;
}
