const formTip = document.querySelector(".calculator");
const buttonTipArray = document.querySelectorAll(".calculator__buttontip");
const amountValue = document.querySelector(".amount-value");
const totalValue = document.querySelector(".total-value");
const inputMoney = document.getElementById("money");
const inputPeople = document.getElementById("people");
let tip = 0;

const clearButtons = () => {
  buttonTipArray.forEach((button) => {
    button.classList.remove("calculator__button--pressed");
  });
};

const clearCosts = () => {
  amountValue.textContent = "$0.00";
  totalValue.textContent = "$0.00";
};

const clearError = (element) => {
  element.classList.remove("calculator__input--invalid");
  element.nextElementSibling.classList.add("calculator__alert--hide");
};

const checkError = (inputToCheck) => {
  if (
    parseFloat(inputToCheck.value) <= 0 ||
    Number.isNaN(parseFloat(inputToCheck.value))
  ) {
    inputToCheck.classList.add("calculator__input--invalid");
    inputToCheck.nextElementSibling.classList.remove("calculator__alert--hide");
    return true;
  } else {
    clearError(inputToCheck);
    return false;
  }
};

const calculateCost = () => {
  if (!checkError(inputMoney) && !checkError(inputPeople)) {
    let bill = parseFloat(inputMoney.value);
    let amountTip = (bill * tip) / 100;
    let tipPerPerson = amountTip / parseFloat(inputPeople.value);
    let totalPerPerson = bill / parseInt(inputPeople.value) + tipPerPerson;
    amountValue.textContent = tipPerPerson.toFixed(2).toString(10);
    totalValue.textContent = totalPerPerson.toFixed(2).toString(10);
  }
};

formTip.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("calculator__buttontip")) {
    clearButtons();
    element.classList.add("calculator__button--pressed");
    tip = parseFloat(element.value);
    calculateCost();
  }
  if (element.classList.contains("calculator__button")) {
    clearButtons();
    clearCosts();
    clearError(inputMoney);
    clearError(inputPeople);
    tip = 0;
  }
});

formTip.addEventListener("change", (e) => {
  const element = e.target;
  if (element.classList.contains("calculator__customtip")) {
    clearButtons();
    tip = parseFloat(element.value);
  }
  calculateCost();
});
