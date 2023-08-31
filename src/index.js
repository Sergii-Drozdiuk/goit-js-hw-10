import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api.js";

const select = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const errorText = document.querySelector(".error");
const catInfoDiv = document.querySelector(".cat-info");

errorText.classList.add('hide');
select.classList.toggle('hide');

fetchBreeds()
.then((breeds) => {
  const markup = breeds.map(({ id, name }) => `<option value="${id}">${name}</option>`);
  select.innerHTML = markup;
  loader.classList.toggle('hide');
  select.classList.toggle('hide');
  new SlimSelect({ select: select });
})
.catch(errorNotify);

select.addEventListener("change", createCatMarkup);

function createCatMarkup(evt) {
  const selectedBreedValue = evt.currentTarget.value;
  catInfoDiv.innerHTML = '';
  errorText.classList.add('hide');
  catInfoDiv.classList.toggle('hide');
  loader.classList.toggle('hide');
    fetchCatByBreed(selectedBreedValue)
      .then((obj) => {
      const { name, description, temperament } = obj.breeds[0];
      const markup = `
        <img class="cat-foto" src="${obj.url}" alt="${name}" width="500px">
        <div class="cat-desc">
        <h2 class="header">${name}</h2>
        <p class="text">${description}</p>
        <p class="text"><b>Temperament:</b> ${temperament}</p>
        </div> `;
      loader.classList.toggle('hide');
      catInfoDiv.classList.toggle('hide');
      catInfoDiv.innerHTML = markup;
    })
      .catch(errorNotify);
};

function errorNotify() {
  loader.classList.toggle('hide');
  errorText.classList.toggle('hide');
  return Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

