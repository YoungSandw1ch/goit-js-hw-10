//==========notify=============================================
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function notifyFailure() {
  Notify.failure('Oops, there is no country with that name', {
    position: 'center-top',
  });
}

export function notifyInfo() {
  Notify.info('Too many matches found. Please enter a more specific name.', {
    position: 'center-top',
  });
}
