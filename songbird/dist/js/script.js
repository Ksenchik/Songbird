import { renderBirds } from "./renderBirds.js";
import { route } from "./routing.js";
import { renderGalleryRight } from "./gallery.js";
import { titleChange } from "./start.js";

let currentStage = 0;
export let result = { score: 0 };

function app() {
  for (const link of document.querySelectorAll(".header__link-item")) {
    link.addEventListener("click", (event) => route(event));
  }

  window.addEventListener("popstate", () => renderRoute());
  start();
}

function start() {
  titleChange();
  renderRoute();
  renderBirds(currentStage);
  renderGalleryRight();
}

function renderRoute() {
  const hash = window.location.hash;

  for (const el of document.querySelectorAll(".section")) {
    el.classList.add("hide");
  }

  for (const el of document.querySelectorAll(".header__link-item")) {
    el.classList.remove("btn-checked");
  }

  let id = "start";
  if (hash === "#game") id = "game";
  if (hash === "#output") id = "output";
  if (hash === "#gallery") id = "gallery";

  document.querySelector(`.${id}`).classList.remove("hide");
  document.querySelector(`.link-${id}`).classList.add("btn-checked");
}

app();
