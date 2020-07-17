const resultField = document.getElementById('result');

const lengthControl = document.getElementById('length');
const uppercaseControl = document.getElementById('uppercase');
const lowercaseControl = document.getElementById('lowercase');
const numberControl = document.getElementById('numbers');
const symbolControl = document.getElementById('symbols');

const generateButton = document.getElementById('generate-btn');
const clipboardButton = document.getElementById('clipboard-btn');

const parseInteger = value => parseInt(value, 10);

const identity = value => value;

const { entries } = Object;

const copyToClipboard = (value) => {
  const textarea = document.createElement('textarea');
  
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
};

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomLower = () =>
  String.fromCharCode(getRandom(97, 122));

const getRandomUpper = () =>
  String.fromCharCode(getRandom(65, 90));

const getRandomNumber = () =>
  String.fromCharCode(getRandom(48, 57));

const getRandomSymbol = (symbols = '!@#$%^&*(){}[]=<>/,.') =>
  symbols[Math.floor(Math.random() * symbols.length)];

const randomFunctionMap = new Map([
  ['lower', getRandomLower],
  ['upper', getRandomUpper],
  ['number', getRandomNumber],
  ['symbol', getRandomSymbol]
]);

const getPasswordSettings = () => ({
  length: parseInteger(lengthControl.value),
  hasLower: lowercaseControl.checked,
  hasUpper: uppercaseControl.checked,
  hasNumber: numberControl.checked,
  hasSymbol: symbolControl.checked,
});

const generatePassword = ({ length, hasLower, hasUpper, hasNumber, hasSymbol }) => {
  let generatedPassword = '';

  const types = {
    lower: hasLower,
    upper: hasUpper,
    number: hasNumber,
    symbol: hasSymbol
  };

  const activeTypes = entries(types)
    .filter(([_type, value]) => value)
    .map(([type]) => type);

  if (activeTypes.length === 0) {
    return '';
  }

  for (let i = 0; i < length; i += activeTypes.length) {
    activeTypes.forEach(type => {
      generatedPassword += (randomFunctionMap.get(type))();
    })
  }

  return generatedPassword.slice(0, length);
};

const handlePasswordGenerate = () => {
  const settings = getPasswordSettings();
  const password = generatePassword(settings);

  resultField.innerHTML = password;
};

const handlePasswordCopyToClipboard = () => {
  const password = resultField.innerHTML;

  if (!password) {
    return;
  }

  copyToClipboard(password);
  alert('Password copied to clipboard');
};

const initializeApp = () => {
  generateButton.addEventListener('click', handlePasswordGenerate);
  clipboardButton.addEventListener('click', handlePasswordCopyToClipboard);
};

initializeApp();
