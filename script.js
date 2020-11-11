let allWishes = [];
const endpoint = "https://spreadsheets.google.com/feeds/list/1aBqfY0KNjVasGmBM79qoo1iGmaXRSGoNwbcyRZTgTuc/od6/public/values?alt=json";
let filter = "kjoler";

window.addEventListener("load", navShow);

function navShow() {
  console.log("navShow");
  document.querySelector(".burger").addEventListener("click", burgerClick);
}

function burgerClick() {
  console.log("burgerClick");
  document.querySelector(".nav_links").classList.toggle("nav-active");
  document.querySelector("#burger_list").classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("site has loaded");
  hentData();
  addListenersToButtons();
}

async function hentData() {
  console.log("hentData");
  const response = await fetch(endpoint);
  allWishes = await response.json();
  showWish();
}

function showWish() {
  const container = document.querySelector("#data_container");
  const stilTemplate = document.querySelector("template");

  container.textContent = "";

  allWishes.feed.entry.forEach(wish => {
    console.log(wish.gsx$kategori);
    if (filter == wish.gsx$kategori.$t) {
      let klon = stilTemplate.cloneNode(true).content;
      klon.querySelector(".navn").textContent = wish.gsx$navn.$t;
      klon.querySelector(".pris").textContent = wish.gsx$pris.$t + " kr.";
      klon.querySelector("img").src = `imgs/${wish.gsx$billede.$t}.PNG`;
      klon.querySelector("a").setAttribute("href", wish.gsx$buttonlink.$t);

      klon.querySelector(".oversigt").addEventListener("click", () => {
        location.href = `single.html?id=${wish.gsx$id.$t}`;
      });

      container.appendChild(klon);
    }
  });
}

function addListenersToButtons() {
  document.querySelectorAll(".filter").forEach(elm => {
    elm.addEventListener("click", filtrering);
  });
}

function filtrering() {
  filter = this.dataset.wish;
  document.querySelector(".kategori_indhold h1").textContent = this.textContent;
  document.querySelectorAll(".filter").forEach(elm => {
    elm.classList.remove("valgt");
  });
  this.classList.add("valgt");
  showWish();
}
