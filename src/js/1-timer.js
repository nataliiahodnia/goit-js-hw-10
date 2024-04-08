import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// const options = {
//      enableTime: true,
//      time_24hr: true,
//      defaultDate: new Date(),
//      minuteIncrement: 1,
//      onClose(selectedDates) {
//        console.log(selectedDates[0]);
//      },
//    };

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let countdownInterval = null;

const addLeadingZero = value => (value < 10 ? `0${value}` : value);

const updateTimer = () => {
  const currentDate = new Date();
  const difference = userSelectedDate - currentDate;

  if (difference <= 0) {
    clearInterval(countdownInterval);
    iziToast.error({
      title: 'Error',
      message: 'The countdown has finished!',
      position: 'topRight',
      backgroundColor: '#ef4040',
    });
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(difference);
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
};

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

startButton.setAttribute('disabled', true);

const initTimer = () => {
  flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      const currentDate = new Date();
      if (userSelectedDate <= currentDate) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
          position: 'topRight',
          backgroundColor: '#ef4040',
        });
      } else {
        startButton.removeAttribute('disabled');
      }
    },
  });

  startButton.addEventListener('click', () => {
    startButton.setAttribute('disabled', true);
    // clearInterval(countdownInterval);
    countdownInterval = setInterval(updateTimer, 1000);
  });
};

initTimer();
