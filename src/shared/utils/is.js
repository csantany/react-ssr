export function isDefined(variable) {
  return typeof variable !== 'undefined' && variable !== null;
}

export function isClient() {
  return isDefined(window);
}
