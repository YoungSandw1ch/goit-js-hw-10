const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25718154-32288cdf6837b8e29b2d2c309';
const SEARCH_DETAILS = '&image_type=photo&orientation=horizontal&per_page=6';

export default async function fetchCoutriesImg(
  countrieName,
  nativeName,
  capital
) {
  const name = countrieName.length > 20 ? nativeName : countrieName;
  const fixedCapital = capital.split(' ')[0];

  const data = await fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${name}+${fixedCapital}${SEARCH_DETAILS}`
  );
  const response = await data.json();
  return await response.hits;
}
