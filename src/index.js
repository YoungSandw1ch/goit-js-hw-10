import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  card: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const name = e.target.value.trim();
  console.log(name);

  if (!name) {
    refs.card.innerHTML = '';
    refs.list.innerHTML = '';
    return;
  }

  fetchCountries(name).then(countries => {
    if (countries.length > 10) {
      notifyInfo();
      return;
    }

    renderCountryList(countries);

    if (countries.length === 1) {
      renderCountryCard(countries);
    }
  });
}

function renderCountryCard(countries) {
  const { name, flags, population, capital, languages } = countries[0];
  const languagesName = languages.map(language => language.name).join(', ');

  const cardMarkup = `
        <div class="card">
          <div class="card__box">
            <img class="card__img" src="${flags.svg}" alt="${name}" width="30"></img>
            <span class="card__text">${name}</span>
          </div>
          <ul class="list">
            <li class="list__item">
              <p class="list__text">Capital: <span class="list__subtext">${capital}</span></p>
            </li>
            <li class="list__item">
              <p class="list__text">Population: <span class="list__subtext">${population}</span></p>
            </li>
            <li class="list__item">
              <p class="list__text">Languages: <span class="list__subtext">${languagesName}</span></p>
            </li>
          </ul>
        </div>`;

  refs.list.innerHTML = '';
  refs.card.innerHTML = cardMarkup;
}

function renderCountryList(countries) {
  const listMarkup = countries
    .map(
      ({ name, flags: { svg } }) =>
        `<li class="country-list__item">
          <img class="country-list__img" src="${svg}" alt="${name}" width="30"></img>
          <span class="country-list__text">${name}</span>
        </li>`
    )
    .join('');

  refs.list.innerHTML = listMarkup;
  refs.card.innerHTML = '';
}

//==========notify=============================================
function notifyFailure() {
  Notify.failure('Oops, there is no country with that name', {
    position: 'center-top',
  });
}

function notifyInfo() {
  Notify.info('Too many matches found. Please enter a more specific name.', {
    position: 'center-top',
  });
}
