//==========notify=============================================
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const OPTIONS = {
  position: 'center-top',
};

export function notifyFailure() {
  Notify.failure('Oops, there is no country with that name', OPTIONS);
}

export function notifyInfo() {
  Notify.info(
    'Too many matches found. Please enter a more specific name.',
    OPTIONS
  );
}

export function notifyWarning() {
  Notify.warning('Please type countrie name', OPTIONS);
}
