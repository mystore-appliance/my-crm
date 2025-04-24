
document.addEventListener("DOMContentLoaded", function () {
  function showForm(id) {
    ['step-one','unit-form-block','part-form-block','stats-block','success-block','unit-confirmation','part-confirmation'].forEach(x => {
      const el = document.getElementById(x);
      if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(id);
    if (target) target.classList.remove('hidden');
  }

  function collectFormData(form) {
    const data = {};
    form.querySelectorAll("[name]").forEach(el => {
      if (el.type === "file" && el.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          data.photo = e.target.result;
          sendData();
        };
        reader.readAsDataURL(el.files[0]);
      } else {
        data[el.name] = el.value || '';
      }
    });
    return data;
  }

  function attachSubmitListener(formSelector, url, type) {
    const form = document.querySelector(formSelector);
    if (!form) return;
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const data = collectFormData(form);
      data.mode = type;
      function sendData() {
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
          if (response.status === "OK") {
            showForm("success-block");
          } else {
            alert("Ошибка: " + response.message);
          }
        })
        .catch(err => {
          alert("Ошибка соединения: " + err.message);
        });
      }
      if (!data.photo) sendData();
    });
  }

  attachSubmitListener("#unit-form-block form", "https://script.google.com/macros/s/AKfycbxHNZJbB75guH0Zk-vkQZTv0b2A_oCN9twCC0d6VoyPTuPGxJcgYchdNEro5gCroSRmLg/exec", "unit");
  attachSubmitListener("#part-form-block form", "https://script.google.com/macros/s/AKfycbxh9AADmshHFbE11Zukdxf43ZZby_paX8VTRlSzDUDHUiQITmRU4QYxe2E6zPdRRsjl/exec", "part");

  window.showForm = showForm;
});
