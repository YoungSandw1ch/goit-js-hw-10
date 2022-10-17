import '../css/02-styles-with-fitches.css';
import debounce from 'lodash.debounce';
import { notifyFailure, notifyInfo } from './02-notify';
import getRefs from './02-get-refs';
import fetchFlags from './02-api-flags';
import fetchCoutries from './02-async-fetchCoutries';
import fetchCoutriesImg from './02-api-flags';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

fetchCoutriesImg('ukraine').then(console.log);

function onSearch() {}
