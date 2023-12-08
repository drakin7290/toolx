export function addClass(e, newClass) {
  if (e != undefined && e != null && e != 'undefined') {
    e?.classList?.add(newClass);
  }
}
export function removeClass(e, newClass) {
  if (e) {
    e?.classList?.remove(newClass);
  }
}
export function hasClass(e, newClass) {
  if (e != undefined && e != null && e != 'undefined') {
    return e?.classList?.contains(newClass);
  }
}

export function toggleClass(e, newClass) {
  if (e) {
    return e?.classList.toggle(newClass);
  }
}
