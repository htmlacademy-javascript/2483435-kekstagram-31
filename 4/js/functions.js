
//1
const checkLength = (string, length) => string.length <= length;


//2
const checkPalindrome = (string) => {
  const formattedString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = formattedString.length - 1;i >= 0;i--) {
    reverseString += formattedString.at(i);
  }
  return formattedString === reverseString;
};


//3
const convertToNumber = (string) => {

  string = string.toString();
  let finalNumber = '';

  for (let i = 0; i <= string.length; i++) {
    const char = string.at(i);

    if ((parseInt(char, 10)) || char === '0' && finalNumber.length !== 0) {
      finalNumber += string.at(i);
    }
  }

  return finalNumber.length > 0 ? finalNumber : NaN;
};
