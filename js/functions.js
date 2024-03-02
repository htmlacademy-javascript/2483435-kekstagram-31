/**
 * module2-task1-1
 */
const checkLength = (string, length) => string.length <= length;

/**
 * module2-task1-2
 */
const checkPalindrome = (string) => {
  const formattedString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = formattedString.length - 1; i >= 0; i--) {
    reverseString += formattedString.at(i);
  }
  return formattedString === reverseString;
};

/**
 * module2-task1-3
 */
const convertToNumber = (string) => {
  string = string.toString();
  let finalNumber = '';

  for (let i = 0; i <= string.length; i++) {
    const char = string.at(i);

    if (parseInt(char, 10) || (char === '0' && finalNumber.length !== 0)) {
      finalNumber += string.at(i);
    }
  }

  return finalNumber.length > 0 ? finalNumber : NaN;
};

/**
 * module5-task2
 */
const checkMeetingDuration = (workStart, workEnd, meetStart, duration) => {
  duration = `0:${duration}`;

  const times = [workStart, workEnd, meetStart, duration];

  const timeInMinutes = times.map((item) => {
    const time = item.split(':');
    return time[0] * 60 + +time[1];
  });

  const meetingTime = timeInMinutes[2] + timeInMinutes[3];

  return (
    timeInMinutes[0] <= timeInMinutes[2] && meetingTime <= timeInMinutes[1]
  );
};


export { checkLength, checkPalindrome, convertToNumber, checkMeetingDuration };
