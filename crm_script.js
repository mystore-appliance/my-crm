console.log("CRM script connected");

// Отправка данных из формы Юнита
function submitUnitData(data) {
  const url = "https://script.google.com/macros/s/AKfycbz4woyLtaeXWf8MPiRc-2Ody4p-_W1VEjoWzP8os8oHgWiun1W2ZNuXQ8JvfMDwBWT6/exec";
  data.mode = "unit";
  fetch(url, {
    method: "POST",
    body: new URLSearchParams(data)
  })
    .then(res => res.text())
    .then(text => {
      console.log("Ответ от сервера (юнит):", text);
    })
    .catch(error => {
      console.error("Ошибка при отправке юнита:", error);
    });
}

// Отправка данных из формы Детали
function submitPartData(data) {
  const url = "https://script.google.com/macros/s/AKfycbzfpAaDaa3CtSCxBy9_gDzD1mwNAz3oyL3W8tz_igdV72_rAVQoOP-vY6_8k3KWC8rL/exec";
  data.mode = "part";
  fetch(url, {
    method: "POST",
    body: new URLSearchParams(data)
  })
    .then(res => res.text())
    .then(text => {
      console.log("Ответ от сервера (деталь):", text);
    })
    .catch(error => {
      console.error("Ошибка при отправке детали:", error);
    });
}
