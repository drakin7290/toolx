export function handleWidthCss(value) {
  return +value.slice(0, -2);
}


export const generateKey = (pre = '') => {
  return `${pre}_${new Date().getTime()}`;
}

export function deleteEl(e) {
  e.parentNode.removeChild(e);
}

export function checkParent(parent, child) {
  if (parent.contains(child))
    return true;
  return false;
}

export function getBound(ref) {
  if (!ref.current) return
  return ref.current.getBoundingClientRect();
}

export function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export function getDomain() {
  if (canUseDOM()) {
    return {
      domain: window.location.host,
    };
  }
}
