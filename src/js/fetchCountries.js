const BASE_URL = 'https://restcountries.com/v2/';
const SEARCH_PARAMS = '?fields=name,capital,population,flags,languages';

export default function fetchCountries(name) {
  return fetch(`${BASE_URL}name/${name}${SEARCH_PARAMS}`).then(response =>
    response.json()
  );
}
