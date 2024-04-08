import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const delay = parseInt(form.delay.value);

  const state = form.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else if (state === "rejected") {
        reject(delay);
      }
    }, delay);
  });

  // Обробка результатів промісу
  promise
    .then((delay) => {

      iziToast.success({
        title: "✅ Fulfilled promise",
        message: `Promise fulfilled in ${delay}ms`,
      });
    })
    .catch((delay) => {

      iziToast.error({
        title: "❌ Rejected promise",
        message: `Promise rejected in ${delay}ms`,
      });
    });
});