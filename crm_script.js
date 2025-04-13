
// Основной JavaScript для MY Master CRM
const scriptURL = "https://script.google.com/macros/s/AKfycbx_b_WdUk7YVwFfWXAMS0iQa8aXUwVernP4uEUSLHaw16p_g236JF-Ac03WdmiCuDUSwg/exec";

// Обработчик отправки формы Юнита
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

// Обработчик отправки формы Детали
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

// Автозаполнение дат
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach(el => el.value = today);
});
