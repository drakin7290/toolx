export function hasWhiteSpace(s) {
  return /\s/g.test(s);
}
export function titleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
}