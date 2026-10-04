import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  startButton: document.querySelector('.start-button'),
  dateInput: document.querySelector('#datetime-picker'),
  timerValueLables: document.querySelectorAll('.timer .value'),
};

let userSelectedDate;

refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      userSelectedDate = selectedDates[0];
      refs.startButton.disabled = false;
    } else {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
      refs.startButton.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startButton.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
  refs.startButton.disabled = true;
  refs.dateInput.disabled = true;

  const leftTime = convertMs(userSelectedDate - new Date());

  console.log(leftTime);

  const [days, hours, minutes, seconds] = refs.timerValueLables;

  days.textContent = addLeadingZero(String(leftTime.days));
  hours.textContent = addLeadingZero(String(leftTime.hours));
  minutes.textContent = addLeadingZero(String(leftTime.minutes));
  seconds.textContent = addLeadingZero(String(leftTime.seconds));

  const timerId = setInterval(() => {
    if (seconds.textContent > 0) {
      seconds.textContent = addLeadingZero(String(seconds.textContent - 1));
    } else if (minutes.textContent > 0) {
      minutes.textContent = addLeadingZero(String(minutes.textContent - 1));
      seconds.textContent = 59;
    } else if (hours.textContent > 0) {
      hours.textContent = addLeadingZero(String(hours.textContent - 1));
      minutes.textContent = 59;
      seconds.textContent = 59;
    } else if (days.textContent > 0) {
      days.textContent = addLeadingZero(String(days.textContent - 1));
      hours.textContent = 23;
      minutes.textContent = 59;
      seconds.textContent = 59;
    } else {
      refs.dateInput.disabled = false;
      clearInterval(timerId);
      iziToast.success({
        message: 'Time has passed!',
      });
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
