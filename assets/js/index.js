function cpfRemoveCaracteres(cpf) {
  return cpf.replace(/\D+/g, '');
}

function cpfToArray(cpf) {
  return Array.from(cpf);
}

function cpfWithoutTwoLastDigits(cpf) {
  return cpfFormat(cpf).splice(0, 9);
}

function cpfWithoutOneLastDigits(cpf) {
  return cpfFormat(cpf).splice(0, 10);
}

function cpfFormat(cpf) {
  cpf = cpfRemoveCaracteres(cpf);
  cpf = cpfToArray(cpf);

  return cpf;
}

function cpfSumTotalNumbersForFirstDigit(cpf) {
  cpf = cpfWithoutTwoLastDigits(cpf);

  return total = cpf.reduce((ac, value, index) => {
    return ac + value * ((cpf.length - index) + 1);
  }, 0);
}

function cpfSumTotalNumbersForSecondDigit(cpf) {
  cpf = cpfWithoutOneLastDigits(cpf);

  return total = cpf.reduce((ac, value, index) => {
    return ac + value * ((cpf.length - index) + 1);
  }, 0);
}

function cpfCalculateFirstDigit(cpf) {
  const total = cpfSumTotalNumbersForFirstDigit(cpf);
  const digit = 11 - (total % 11);
  return digit < 9 ? digit : 0;
}

function cpfCalculateSecondDigit(cpf) {
  const total = cpfSumTotalNumbersForSecondDigit(cpf);
  const digit = 11 - (total % 11);
  return digit < 9 ? digit : 0;
}

function cpfExtractTwoLastDigits(cpf) {
  return cpfFormat(cpf).splice(-2, 9);
}

function isValidCPF(cpf) {
  const firstDigit = cpfCalculateFirstDigit(cpf);
  const secondDigit = cpfCalculateSecondDigit(cpf);
  const cpfDigits = cpfExtractTwoLastDigits(cpf);

  return firstDigit == cpfDigits[0] && secondDigit == cpfDigits[1];
}

const inputElement = document.querySelector('.validator__input');
const buttonElement = document.querySelector('.validator__button');
const resultElement = document.querySelector('.validator__result');

function isInputValueEmpty() {
  return inputElement.value == '';
}

function isInputValueShort() {
  return inputElement.value.length < 11;
}

function isValidInputValueFormat() {
  return isInputValueEmpty() == false && isInputValueShort() == false;
}

function insertInvalidInputValueResultMessage() {
  if(isInputValueEmpty()) {
    resultElement.innerText = "O campo CPF não pode estar vazio.";
  } else if (isInputValueShort()) {
    resultElement.innerText = "Digite o CPF completo. Pontos e traços são opcionais.";
  }
}

function insertInvalidInputValueResultStyle() {
  if(isInputValueEmpty()) {
    resultElement.classList.add("result--warning");
    resultElement.classList.remove("result--negative");
    resultElement.classList.remove("result--positive");
  } else if (isInputValueShort()) {
    resultElement.classList.add("result--warning");
    resultElement.classList.remove("result--negative");
    resultElement.classList.remove("result--positive");
  }
}

function insertValidateCPFResultMessage(message) {
  resultElement.innerText = message;
}

function insertValidateCPFResultStyle(valid) {
  if (valid) {
    resultElement.classList.add("result--positive");
    resultElement.classList.remove("result--negative");
    resultElement.classList.remove("result--warning");
  } else {
    resultElement.classList.add("result--negative");
    resultElement.classList.remove("result--positive");
    resultElement.classList.remove("result--warning");
  }
}

function validateUserCPF() {
  if (isValidInputValueFormat()) {
    if (isValidCPF(inputElement.value)) {
      insertValidateCPFResultMessage('CPF válido.');
      insertValidateCPFResultStyle(true);
    } else {
      insertValidateCPFResultMessage('CPF inválido.');
      insertValidateCPFResultStyle(false);
    }
  } else {
    insertInvalidInputValueResultMessage();
    insertInvalidInputValueResultStyle();
  }
}

buttonElement.addEventListener('click', validateUserCPF);
