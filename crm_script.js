document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = new URLSearchParams();

      for (const pair of formData) {
        data.append(pair[0], pair[1]);
      }

      // определим тип формы
      if (form.closest("#unit-form-block")) {
        data.append("mode", "unit");
      } else if (form.closest("#part-form-block")) {
        data.append("mode", "part");
      }

      fetch("https://script.google.com/macros/s/AKfycby2xNlk8A2Ha_RkCOo8gK9Ia_bnmmNN5UT12EqBKfc1WEgONN6bD2__xTf7ylUHeh9m/exec", {
        method: "POST",
        body: data
      })
      .then(response => response.text())
      .then(result => {
        if (result.includes("OK")) {
          showForm("success-block");
        } else {
          alert("Ошибка при отправке: " + result);
        }
      })
      .catch(error => {
        console.error("Ошибка отправки:", error);
        alert("Произошла ошибка отправки.");
      });
    });
  });
});
