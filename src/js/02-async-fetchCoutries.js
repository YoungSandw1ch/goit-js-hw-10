const BASE_URL = 'https://restcountries.com/v2';
const SEARCH_PARAMS = '?fields=name,capital,population,flags,languages';

export default async function fetchCoutries(countrieName) {
  const countries = await fetch(
    `${BASE_URL}/name/${countrieName}${SEARCH_PARAMS}`
  );
  return await countries.json();
}
