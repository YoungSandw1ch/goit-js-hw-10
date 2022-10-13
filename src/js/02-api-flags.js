// https://api.unsplash.com/search/photos?client_id=B5_SFW_824I4sQqIUzostfDqrZy8yTmNss3jOC2Xmls&page=1&per_page=1&query=ukraine+flag

const BASE_URL = 'https://api.unsplash.com';
const KEY = 'B5_SFW_824I4sQqIUzostfDqrZy8yTmNss3jOC2Xmls';

export default async function fetchFlags(countrieName) {
  const response = await fetch(
    `${BASE_URL}/search/photos?client_id=${KEY}&page=1&per_page=1&query=${countrieName}+flag`
  );
  const country = await response.json();
  const url = country.results[0].urls.regular;

  return url;
}
