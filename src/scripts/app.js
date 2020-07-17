const getRandom = (min, max) => 
  Math.floor(Math.random() * (max - min) + min);

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
