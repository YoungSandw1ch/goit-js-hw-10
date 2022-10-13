import '../css/02-styles-with-fitches.css';
import debounce from 'lodash.debounce';
import getRefs from './02-get-refs';
import { notifyFailure, notifyInfo } from './02-notify';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// console.log(refs);
// console.log(notifyInfo);

function onSearch() {}
