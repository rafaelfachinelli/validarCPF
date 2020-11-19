/*
705.484.450-52
0  1  2  3  4  5  6  7  8
7  0  5  4  8  4  4  5  0
x  x  x  x  x  x  x  x  x
10 9  8  7  6  5  4  3  2
=  =  =  =  =  =  =  =  =
70 0 40 28 48 20 16 15  0 = 237

11 - (237 % 11) = 5 (Primeiro digito)
Se o digito for maior que 9, consideramos 0.

7  0  5  4  8  4  4  5 0 5
x  x  x  x  x  x  x  x x x
11 10 9  8  7  6  5  4 3 2
=  =  =  =  =  =  =  = = =
77 0 45 32 56 24 20 20 0 10 = 284

11 - (284 % 11) = 2 (Segundo digito)
Se o digito for maior que 9, consideramos 0.
*/

let cpf = '705.484.450-52';

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
    return ac + value * ((cpf.length - index) + 1)
  }, 0);
}

function cpfSumTotalNumbersForSecondDigit(cpf) {
  cpf = cpfWithoutOneLastDigits(cpf);

  return total = cpf.reduce((ac, value, index) => {
    return ac + value * ((cpf.length - index) + 1)
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
  return cpfFormat(cpf).splice(9, 11);
}

function cpfValidate(cpf) {
  const firstDigit = cpfCalculateFirstDigit(cpf);
  const secondDigit = cpfCalculateSecondDigit(cpf);
  const cpfDigits = cpfExtractTwoLastDigits(cpf);

  if(firstDigit == cpfDigits[0] && secondDigit == cpfDigits[1]) {
    return true;
  } else {
    return false
  }
}

console.log(cpfValidate('436.483.438-66'));