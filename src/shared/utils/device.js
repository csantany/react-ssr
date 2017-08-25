export function getCurrentDevice(ua) {
  return /mobile/i.test(ua) ? 'mobile' : 'desktop';
}

export function isBot(ua) {
  return /bot|googlebot|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex|crawler|spider|robot|crawling/i.test(ua);
}

export function isDesktop(ua) {
  return !/mobile/i.test(ua);
}

export function isMobile(ua) {
  return /mobile/i.test(ua);
}
