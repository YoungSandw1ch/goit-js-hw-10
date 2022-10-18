import '../css/02-styles-with-fitches.css';
import '../css/02-spinner.css';
import '../css/02-lightbox.css';
import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { notifyFailure, notifyInfo, notifyWarning } from './02-notify';
import countieItemTpl from '../templates/coutries-item.hbs';
import countieCardTpl from '../templates/countrie-card.hbs';
import galleryTpl from '../templates/gallery.hbs';
import getRefs from './02-get-refs';
import fetchCoutries from './02-async-fetchCoutries';
import fetchCoutriesImg from './02-fetchImages';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();
let searchQuery = '';

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY), {
  passive: false,
});

//====добавляет возможность выбрать страну нажатием на ее в списке стран======
//====жена "тестеровщик" сказала что ей так удобно============================
refs.list.addEventListener('click', onItemClick);
console.log(
  `%cВыбирать страну можно нажатием на нее в списке стран`,
  'color: green; font-size: 17px'
);

async function onItemClick(e) {
  if (e.target === e.currentTarget) return;
  const item = e.target.closest('li');
  searchQuery = item.dataset.name;

  const countries = await fetchCoutries(searchQuery);
  countries.splice(1, 1); //фикс рендера таких стран как Судан и Южный Судан
  clearCountriesList();
  createAndRenderCard(countries);
  toogleSpinner();

  const { name, capital, nativeName } = countries[0];
  const data = await fetchCoutriesImg(name, nativeName, capital);
  createAndRenderGallery(data);
  createLightbox();
  toogleSpinner();
}
//=============================================================================
function onSearch(e) {
  searchQuery = e.target.value;
  if (!searchQuery) {
    notifyWarning();
    clearCountriesCard();
    clearCountriesList();
    return;
  }

  fetchCoutries(searchQuery)
    .then(countries => {
      if (countries.length > 10) {
        clearCountriesList();
        clearCountriesCard();
        notifyInfo();
        return;
      }

      createAndRenderItems(countries);
      clearCountriesCard();

      if (countries.length === 1) {
        clearCountriesList();
        createAndRenderCard(countries);
        toogleSpinner();

        const { name, capital, nativeName } = countries[0];
        fetchCoutriesImg(name, nativeName, capital)
          .then(createAndRenderGallery)
          .then(createLightbox)
          .finally(toogleSpinner);
        return;
      }
    })
    .catch(() => {
      notifyFailure();
      clearCountriesCard();
      clearCountriesList();
    });
}

function createAndRenderItems(countries) {
  refs.list.innerHTML = countieItemTpl(countries);
}

function createAndRenderCard(countries) {
  refs.card.innerHTML = countieCardTpl(countries);
}

function createAndRenderGallery(data) {
  const galleryBox = document.querySelector('.gallery');
  galleryBox.innerHTML = galleryTpl(data);
}

function clearCountriesList() {
  refs.list.innerHTML = '';
}

function clearCountriesCard() {
  refs.card.innerHTML = '';
}

function toogleSpinner() {
  const spinner = document.querySelector('.lds-spinner');
  const gallery = document.querySelector('.gallery');
  gallery?.classList.toggle('spinner');
  spinner?.classList.toggle('is-hide');
}

function createLightbox() {
  var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'title',
    captionDelay: 250,
  });
}
