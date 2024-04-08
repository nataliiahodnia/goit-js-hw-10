import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(form.delay.value);

  const state = form.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'OK Fulfilled promise',
        message: `Promise fulfilled in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59a10d',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error: Rejected promise',
        message: `Promise rejected in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#ef4040',
      });
    });
});
