import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  datetimePicker: document.getElementById('datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  daysElement: document.querySelector('[data-days]'),
  hoursElement: document.querySelector('[data-hours]'),
  minutesElement: document.querySelector('[data-minutes]'),
  secondsElement: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let countdownInterval = null;

const addLeadingZero = value => (value < 10 ? `0${value}` : value);

const updateTimer = () => {
  const currentDate = Date.now();
  const difference = userSelectedDate - currentDate;

  if (difference <= 0) {
    clearInterval(countdownInterval);
    showSuccessToast('The countdown has finished!');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(difference);
  elements.daysElement.textContent = addLeadingZero(days);
  elements.hoursElement.textContent = addLeadingZero(hours);
  elements.minutesElement.textContent = addLeadingZero(minutes);
  elements.secondsElement.textContent = addLeadingZero(seconds);
};

const showSuccessToast = message => {
  iziToast.success({
    title: 'Success',
    message: message,
    position: 'topRight',
  });
};

const showErrorToast = message => {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    backgroundColor: '#ef4040',
  });
};

const toggleInputState = () => {
  if (countdownInterval) {
    elements.datetimePicker.disabled = true;
    elements.startButton.setAttribute('disabled', 'disabled');
  } else {
    elements.datetimePicker.disabled = false;
    elements.startButton.removeAttribute('disabled');
  }
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

elements.startButton.setAttribute('disabled', true);

flatpickr(elements.datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();

    if (userSelectedDate <= currentDate) {
      showErrorToast('Please choose a date in the future');
      return;
    }

    toggleInputState();
  },
});

elements.startButton.addEventListener('click', () => {

  countdownInterval = setInterval(updateTimer, 1000);
  
  toggleInputState();
});
