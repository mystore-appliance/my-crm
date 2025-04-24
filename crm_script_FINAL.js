
document.addEventListener("DOMContentLoaded", function () {
  function showForm(id) {
    ['step-one','unit-form-block','part-form-block','stats-block','success-block','unit-confirmation','part-confirmation'].forEach(x => {
      const el = document.getElementById(x);
      if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(id);
    if (target) target.classList.remove('hidden');
  }

  function previewImage(input, previewId) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById(previewId);
      img.src = e.target.result;
      img.style.display = "block";
    };
    reader.readAsDataURL(file);
  }

  // Считаем профит при вводе
  const partForm = document.querySelector('#part-form-block form');
  if (partForm) {
    partForm.addEventListener('input', function () {
      const price = parseFloat(partForm.querySelector('input[name="price"]').value) || 0;
      const fee = parseFloat(partForm.querySelector('input[name="fee"]').value) || 0;
      const profit = price - fee;
      const profitInput = partForm.querySelector('input[name="profit"]');
      if (profitInput) {
        profitInput.value = profit.toFixed(2);
      }
    });
  }

  // iframe feedback after form submission
  const forms = document.querySelectorAll("form[target='hidden_iframe']");
  forms.forEach(form => {
    form.addEventListener("submit", function () {
      setTimeout(() => showForm("success-block"), 600);
    });
  });

  // Навигация
  window.showForm = showForm;
  window.previewImage = previewImage;
});
