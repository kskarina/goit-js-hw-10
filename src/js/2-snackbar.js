import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  promiseForm: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
};

refs.promiseForm.addEventListener('submit', onSubmitButtonClick);

function onSubmitButtonClick(event) {
  event.preventDefault();
  const delay = Number(refs.delayInput.value);

  const checkedRadio = document.querySelector('input[name="state"]:checked');

  const promiseType = checkedRadio.value;

  new Promise((resolve, reject) => {
    
    setTimeout(() => {
      promiseType === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  })
    .then(ms =>
      iziToast.success({
        title: '✅',
        message: `Fulfilled promise in ${ms}ms`,
      })
    )
    .catch(ms =>
      iziToast.error({
        title: '❌',
        message: `Rejected promise in ${ms}ms`,
      })
    );

  refs.promiseForm.reset();
}
