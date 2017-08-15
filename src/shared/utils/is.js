export function isDefined(variable) {
  return typeof variable !== 'undefined' && variable !== null;
}

export function isBrowser() {
  return isDefined(window);
}
