'use strict';

const history = document.getElementById('history-value');
const result = document.getElementById('output');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');

const getHistory = function () {
  return history.innerText;
};

const getResult = function () {
  return result.innerText;
};

const showHistory = function (num) {
  history.innerText = num;
};

const showResult = function (num) {
  if (num === '') {
    result.innerText = '';
  } else {
    result.innerText = getFormattedNumber(num);
  }
};

const getFormattedNumber = function (num) {
  if (num === '-') {
    return '';
  }
  let n = Number(num);
  let value = n.toLocaleString('en');
  return value;
};

const reverseNumberFormat = function (num) {
  return Number(num.replace(/,/g, ''));
};

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    if (operator.id === 'clear') {
      showHistory('');
      showResult('');
    } else if (operator.id === 'backspace') {
      let output = reverseNumberFormat(getResult()).toString();
      if (output) {
        output = output.substr(0, output.length - 1);
        showResult(output);
      }
    } else {
      // console.log(operator.id);
      let output = getResult();
      let flow = getHistory();
      if (output == '' && flow !== '') {
        if (isNaN(flow[flow.length - 1])) {
          flow = flow.substr(0, flow.length - 1);
        }
      }
      if (output !== '' || flow !== '') {
        output = output === '' ? output : reverseNumberFormat(output);
        flow = flow + output;
        if (operator.id === '=') {
          console.log(flow);
          console.log(eval(flow));
          showResult(eval(flow));
          showHistory('');
        } else {
          flow = flow + operator.id;
          showHistory(flow);
          showResult('');
        }
      }
    }
  });
});

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    let output = reverseNumberFormat(getResult());
    if (output != NaN) {
      output = output + number.id;
      showResult(output);
    }
  });
});
