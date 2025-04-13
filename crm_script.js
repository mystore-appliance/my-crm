
// Основной JavaScript для MY Master CRM (v2)
const scriptURL = "https://script.google.com/macros/s/AKfycby2xNlk8A2Ha_RkCOo8gK9Ia_bnmmNN5UT12EqBKfc1WEgONN6bD2__xTf7ylUHeh9m/exec";

// Отправка Юнита
function sendUnitData(formData) {
  formData.append("mode", "unit");
  fetch(scriptURL, {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(result => console.log("Юнит отправлен:", result))
  .catch(error => console.error("Ошибка отправки юнита:", error));
}

// Отправка Детали
function sendPartData(formData) {
  formData.append("mode", "part");
  fetch(scriptURL, {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(result => console.log("Деталь отправлена:", result))
  .catch(error => console.error("Ошибка отправки детали:", error));
}

// Автоматическое заполнение дат в форме
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach(el => el.value = today);
});
