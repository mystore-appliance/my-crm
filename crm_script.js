
// Подключение к Google Script
const scriptURL = "https://script.google.com/macros/s/AKfycby2xNlk8A2Ha_RkCOo8gK9Ia_bnmmNN5UT12EqBKfc1WEgONN6bD2__xTf7ylUHeh9m/exec";

// Отправка данных формы Юнита
function sendUnitData(formData) {
  formData.append("mode", "unit");
  fetch(scriptURL, {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(res => {
    console.log("Юнит отправлен:", res);
  })
  .catch(err => console.error("Ошибка отправки юнита:", err));
}

// Отправка данных формы Детали
function sendPartData(formData) {
  formData.append("mode", "part");
  fetch(scriptURL, {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(res => {
    console.log("Деталь отправлена:", res);
  })
  .catch(err => console.error("Ошибка отправки детали:", err));
}

// Обработчик отправки формы Юнита
function submitUnitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  sendUnitData(formData);
}

// Обработчик отправки формы Детали
function submitPartForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  sendPartData(formData);
}

// Автозаполнение текущей даты
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach(el => {
    if (!el.value) el.value = today;
  });
});
