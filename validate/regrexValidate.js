export function leastUpChar(str, minUpperCase = 1) {
  const pattern = new RegExp(`^(?:[^A-Z]*[A-Z]){${minUpperCase},}`, 'g');
  return pattern.test(str);
}
export function isPhone(str) {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return pattern.test(str);
}
export function isEmail(str) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(str);
}
export function maxLength(str, number = undefined) {
  if (number) {
    if (str.length <= number) {
      return true;
    }
    return false;
  }
  return true;
}
export function minLength(str, number = 0) {
  return str.length >= number;
}
export function leastSpecialChar(str, number = 1) {
  const pattern = new RegExp('(.*[!@#$%^&*()\\-+={}\\[\\]|;:\'",.<>?~`]){' + number + ',}.*');
  return pattern.test(str);
}
