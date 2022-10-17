const BASE_URL = 'https://restcountries.com/v2';
const SEARCH_PARAMS =
  '?fields=name,nativeName,capital,population,flags,languages';

export default async function fetchCoutries(countrieName) {
  const response = await fetch(
    `${BASE_URL}/name/${countrieName}${SEARCH_PARAMS}`
  );

  if (!response.ok) {
    throw new Error(response.message);
  }

  return await response.json();
}
