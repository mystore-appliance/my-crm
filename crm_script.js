
console.log("CRM script connected");

// Отправка данных из формы Юнита
function submitUnitData(data) {
  const url = "https://script.google.com/macros/s/AKfycbzRHnbojRqEsuTwof7qJzyCZ731qHclLd6MRpgvnXZU8GPyVAXxrNR7PP___w1msk93hA/exec";
  data.mode = "unit";
  fetch(url, {
    method: "POST",
    body: new URLSearchParams(data)
  }).then(res => res.text()).then(console.log).catch(console.error);
}

// Отправка данных из формы Детали
function submitPartData(data) {
  const url = "https://script.google.com/macros/s/AKfycbzRHnbojRqEsuTwof7qJzyCZ731qHclLd6MRpgvnXZU8GPyVAXxrNR7PP___w1msk93hA/exec";
  data.mode = "part";
  fetch(url, {
    method: "POST",
    body: new URLSearchParams(data)
  }).then(res => res.text()).then(console.log).catch(console.error);
}
