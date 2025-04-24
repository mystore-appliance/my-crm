<script>
function showForm(id) {
  ['step-one','unit-form-block','part-form-block','stats-block','success-block','unit-confirmation','part-confirmation'].forEach(x => {
    const el = document.getElementById(x);
    if (el) el.classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}

function previewBeforeSubmit(form, confirmId) {
  const previewBlock = document.getElementById(confirmId === 'unit-confirmation' ? 'unit-data-preview' : 'part-data-preview');
  let values = '';
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(el => {
    const labelEl = el.closest('label') || el.previousElementSibling;
    const label = labelEl ? labelEl.innerText : el.name || el.placeholder || 'Поле';
    let value = '';
    if (el.type === 'file') {
      value = el.files.length > 0 ? el.files[0].name : 'Файл не выбран';
    } else if (el.type === 'checkbox' || el.type === 'radio') {
      if (el.checked) value = el.value;
    } else {
      value = el.value || '(пусто)';
    }
    if (label) {
      values += `<p><strong>${label}:</strong> ${value}</p>`;
    }
  });
  previewBlock.innerHTML = values;
  showForm(confirmId);
  return false;
}

function submitFinal(type) {
  showForm('success-block');
}

function goBack() {
  showForm('step-one');
}

document.addEventListener('DOMContentLoaded', function () {
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
});

document.addEventListener('DOMContentLoaded', function () {
  const priceInput = document.querySelector('input[name="price"]');
  const feeInput = document.querySelector('input[name="fee"]');
  const profitInput = document.querySelector('input[name="profit"]');

  if (priceInput && feeInput && profitInput) {
    const calculateProfit = () => {
      const price = parseFloat(priceInput.value) || 0;
      const fee = parseFloat(feeInput.value) || 0;
      profitInput.value = (price - fee).toFixed(2);
    };

    priceInput.addEventListener('input', calculateProfit);
    feeInput.addEventListener('input', calculateProfit);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const priceInput = document.querySelector('input[name="price"]');
  const feeInput = document.querySelector('input[name="fee"]');
  const profitInput = document.querySelector('input[name="profit"]');

  if (priceInput && feeInput && profitInput) {
    function calculateProfit() {
      const price = parseFloat(priceInput.value) || 0;
      const fee = parseFloat(feeInput.value) || 0;
      const profit = price - fee;
      profitInput.value = profit.toFixed(2);
    }

    priceInput.addEventListener('input', calculateProfit);
    feeInput.addEventListener('input', calculateProfit);
  }
});
</script>
<script>
document.addEventListener('DOMContentLoaded', function () {
  // === Автогенерация ID юнита ===
  const unitIdInput = document.querySelector('#unit-form-block input[type="text"]');
  let units = JSON.parse(localStorage.getItem('unitIds') || '[]');
  if (unitIdInput && units.length >= 0) {
    const nextUnitNumber = units.length + 1;
    const newUnitId = 'U' + nextUnitNumber.toString().padStart(4, '0');
    unitIdInput.value = newUnitId;
  }

  // === Сохраняем новый юнит в localStorage при сабмите ===
  const unitForm = document.querySelector('#unit-form-block form');
  unitForm.addEventListener('submit', function () {
    const unitId = unitIdInput.value;
    if (!units.includes(unitId)) {
      units.push(unitId);
      localStorage.setItem('unitIds', JSON.stringify(units));
      localStorage.setItem(unitId + '_parts', JSON.stringify([]));
    }
  });

  // === Выпадающий список ID юнитов в форме детали ===
  const unitSelectContainer = document.querySelector('#part-form-block input[placeholder*="ID юнита"]')?.parentElement;
  const manualInput = document.querySelector('#part-form-block input[placeholder*="ID юнита"]');
  if (unitSelectContainer && manualInput) {
    const select = document.createElement('select');
    select.style = manualInput.style.cssText;
    const opt = document.createElement('option');
    opt.text = 'Выбрать из списка';
    opt.disabled = true;
    opt.selected = true;
    select.appendChild(opt);

    units.forEach(id => {
      const o = document.createElement('option');
      o.text = id;
      o.value = id;
      select.appendChild(o);
    });

    select.addEventListener('change', () => {
      manualInput.value = select.value;
      generateDetailId(select.value);
    });

    unitSelectContainer.insertBefore(select, manualInput);
  }

  // === Автогенерация ID детали ===
  const detailIdInput = document.querySelector('#part-form-block input[placeholder*="ID детали"]');
  const unitIdInputInPart = document.querySelector('#part-form-block input[placeholder*="ID юнита"]');

  function generateDetailId(unitId) {
    let parts = JSON.parse(localStorage.getItem(unitId + '_parts') || '[]');
    const nextPart = parts.length + 1;
    const newPartId = unitId + '-P' + nextPart.toString().padStart(3, '0');
    if (detailIdInput) detailIdInput.value = newPartId;
  }

  // === При сабмите формы детали — сохраняем её ID ===
  const partForm = document.querySelector('#part-form-block form');
  partForm.addEventListener('submit', function () {
    const unitId = unitIdInputInPart.value;
    const partId = detailIdInput.value;
    if (unitId && partId) {
      let parts = JSON.parse(localStorage.getItem(unitId + '_parts') || '[]');
      if (!parts.includes(partId)) {
        parts.push(partId);
        localStorage.setItem(unitId + '_parts', JSON.stringify(parts));
      }
    }
  });
});
</script>
<script>
document.addEventListener("DOMContentLoaded", function () {
  const UNIT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz4woyLtaeXWf8MPiRc-2Ody4p-_W1VEjoWzP8os8oHgWiun1W2ZNuXQ8JvfMDwBWT6/exec";
  const PART_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfpAaDaa3CtSCxBy9_gDzD1mwNAz3oyL3W8tz_igdV72_rAVQoOP-vY6_8k3KWC8rL/exec";

  function collectFormData(form) {
    const data = {};
    form.querySelectorAll("[name]").forEach(el => {
      if (el.type === "file") return;
      data[el.name] = el.value || '';
    });
    return data;
  }

  window.submitFinal = function(type) {
    const form = document.querySelector(type === "unit" ? "#unit-form-block form" : "#part-form-block form");
    const url = type === "unit" ? UNIT_SCRIPT_URL : PART_SCRIPT_URL;

    const data = collectFormData(form);
    data.mode = type;

    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: formData
    })
    .then(() => {
      console.log(`${type} отправлен.`);
      showForm("success-block");
    })
    .catch(err => {
      console.error("Ошибка при отправке:", err);
      alert("Ошибка при отправке. Проверьте соединение.");
    });
  };
});
</script>
