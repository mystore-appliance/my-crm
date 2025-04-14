console.log("CRM script connected");

// === ОТПРАВКА ЮНИТА ===
function submitUnitData(data) {
  const url = "https://script.google.com/macros/s/AKfycbz4woyLtaeXWf8MPiRc-2Ody4p-_W1VEjoWzP8os8oHgWiun1W2ZNuXQ8JvfMDwBWT6/exec";

  fetch(url, {
    method: "POST",
    body: new URLSearchParams(data)
  })
  .then(res => res.text())
  .then((text) => {
    console.log("unit отправлен: ", text);
    showForm("success-block");
  })
  .catch((err) => {
    console.error("Ошибка при отправке юнита:", err);
    alert("Ошибка при отправке юнита.");
  });
}

// === ОТПРАВКА ДЕТАЛИ ===
function submitPartData(data) {
  const url = "https://script.google.com/macros/s/AKfycbzfpAaDaa3CtSCxBy9_gDzD1mwNAz3oyL3W8tz_igdV72_rAVQoOP-vY6_8k3KWC8rL/exec";

  fetch(url, {
    method: "POST",
    body: new URLSearchParams(data)
  })
  .then(res => res.text())
  .then((text) => {
    console.log("part отправлена: ", text);
    showForm("success-block");
  })
  .catch((err) => {
    console.error("Ошибка при отправке детали:", err);
    alert("Ошибка при отправке детали.");
  });
}

// === ОБЩАЯ ФУНКЦИЯ ===
window.submitFinal = function(type) {
  const form = document.querySelector(type === "unit" ? "#unit-form-block form" : "#part-form-block form");
  const inputs = form.querySelectorAll("input, select, textarea");
  const data = {};

  inputs.forEach((el) => {
    if (!el.name || el.type === "file") return;
    data[el.name] = el.value;
  });

  if (type === "unit") {
    submitUnitData(data);
  } else {
    submitPartData(data);
  }
};
