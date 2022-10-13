import '../css/styles-with-fitches.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

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
