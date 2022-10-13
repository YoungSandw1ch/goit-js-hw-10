import '../css/02-styles-with-fitches.css';
import debounce from 'lodash.debounce';
import { notifyFailure, notifyInfo } from './02-notify';
import getRefs from './02-get-refs';
import fetchFlags from './02-api-flags';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// console.log(refs);
// console.log(notifyInfo);
console.log(fetchFlags);
fetchFlags('canada').then(console.log);
//   .then(data => {
//   const url = data.results[0].urls.raw;

//   console.log(url);
// });

function onSearch() {}
