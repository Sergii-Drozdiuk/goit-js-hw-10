import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api.js";

const select = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfoDiv = document.querySelector(".cat-info");

error.classList.add('hide');
select.classList.toggle('hide');

fetchBreeds()
.then((breeds) => {
  const markup = breeds.map(({ id, name }) => `<option value="${id}">${name}</option>`).join("");
  select.innerHTML = markup;
  loader.classList.toggle('hide');
  select.classList.toggle('hide');
  new SlimSelect({ select: select });
})
.catch(() => {
  return Notify.failure(error.textContent);
});

select.addEventListener("change", (evt) => {
  const selectedBreedValue = evt.currentTarget.value;
    catInfoDiv.innerHTML = '';
    fetchCatByBreed(selectedBreedValue)
      .then((obj) => {
      const { name, description, temperament } = obj.breeds[0];
      const markup = `
        <img src="${obj.url}" alt="${name}" width="500px">
        <h2 class="header">${name}</h2>
        <p class="text">${description}</p>
        <p class="text"><b>Temperament:</b> ${temperament}</p> `;
      catInfoDiv.innerHTML = markup;
      // loader.classList.toggle('hide');
      // catInfoDiv.classList.toggle('hide');
    })
      .catch((error) => {
      console.log(error)
      // loader.classList.toggle('hide');
      // error.classList.toggle('hide');
    });
});
