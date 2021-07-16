const billInput = document.getElementById("bill");
const tipNumbers = document.querySelectorAll("span");
const peopleInput = document.getElementById("people");
const tipAmount = document.querySelector(".amount");
const totalTipPerson = document.querySelector(".tip-total");
const btnReset = document.querySelector(".btn-reset");
const errorPeople = document.querySelector(".error");
const errorBill = document.querySelector(".error-bill");
const customInputTip = document.getElementById("custom");

const numberRegExp = /^[0-9.]+$/;
const letterRegExp = /^[A-Za-z]+$/;
let tipValue = 0;

tipNumbers.forEach((number, index) => {
  number.addEventListener("click", () => {
    tipValue = number.dataset.value;
    performCalculation(tipValue);
    btnReset.classList.add("active");

    if (
      letterRegExp.test(billInput.value) ||
      letterRegExp.test(peopleInput.value)
    ) {
      tipAmount.textContent = "$0.00";
      totalTipPerson.textContent = "$0.00";
    }

    if (number.classList.contains("first")) {
      number.classList.toggle("active");
    } else {
      number.classList.remove("active");
    }
  });
});

function billValidation() {
  if (!numberRegExp.test(billInput.value)) {
    errorBill.textContent = "Must be a number";
  } else {
    errorBill.textContent = "";
  }
}

function peopleValidation() {
  if (!numberRegExp.test(peopleInput.value)) {
    errorPeople.textContent = "Must be a number";
  } else {
    errorPeople.textContent = "";
  }
}

function periodValidation() {
  const period = billInput.value;
  billInput.value =
    period.indexOf(".") > 0
      ? period.substr(0, period.indexOf(".")) +
        period.substr(period.indexOf("."), 3)
      : period;
}

function performCalculation(tip) {
  const totalTip = billInput.value * tip;
  const tipPerPerson = totalTip / peopleInput.value;
  const totalBill = totalTip + parseFloat(billInput.value);
  const totalBillPerPerson = totalBill / peopleInput.value;

  if (
    billInput.value === "" ||
    peopleInput.value === "" ||
    peopleInput.value === "0"
  ) {
    errorPeople.textContent = "Can't be zero";
    peopleInput.style.border = "2px solid hsl(0, 100%, 50%)";
    tipAmount.textContent = "$0.00";
    totalTipPerson.textContent = "$0.00";
  } else {
    errorPeople.textContent = "";
    peopleInput.style.border = "";
    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalTipPerson.textContent = `$${totalBillPerPerson.toFixed(2)}`;
  }
}

customInputTip.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    const customValue = parseFloat(customInputTip.value) / 100;
    const customTotalTip = billInput.value * customValue;
    const customTipPerPerson = customTotalTip / peopleInput.value;
    const customTotalBill = customTotalTip + parseFloat(billInput.value);
    const customTotalBillPerPerson = customTotalBill / peopleInput.value;

    if (
      billInput.value === "" ||
      peopleInput.value === "" ||
      peopleInput.value === "0"
    ) {
      tipAmount.textContent = "$0.00";
      totalTipPerson.textContent = "$0.00";
    } else {
      tipAmount.textContent = `$${customTipPerPerson.toFixed(2)}`;
      totalTipPerson.textContent = `$${customTotalBillPerPerson.toFixed(2)}`;
    }
  }
});

function resetAll() {
  btnReset.classList.remove("active");
  billInput.value = "";
  peopleInput.value = "";
  tipAmount.textContent = "$0.00";
  totalTipPerson.textContent = "$0.00";
  customInputTip.value = "";
}

billInput.addEventListener("input", billValidation);
billInput.addEventListener("keyup", periodValidation);
peopleInput.addEventListener("input", peopleValidation);
btnReset.addEventListener("click", resetAll);
