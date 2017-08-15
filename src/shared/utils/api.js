// Dependencies
import queryString from 'query-string';

export function apiEndpoint(endpoint, qs) {
  let query = '';

  if (qs) {
    query = `?${qs}`;
  }

  return `http://localhost:3000/api/${endpoint}${query}`;
}

export function apiFetch(endpoint, options = {}, query = false) {
  let qs;

  if (query) {
    qs = queryString.stringify(query);
  }

  const fetchOptions = apiOptions(options);
  const fetchEndpoint = apiEndpoint(endpoint, qs);

  return fetch(fetchEndpoint, fetchOptions).then(response => response.json());
}

export function apiOptions(options = {}) {
  const {
    method = 'GET',
    headers = {
      'Content-Type': 'application/json'
    },
    body = false
  } = options;

  const newOptions = {
    method,
    headers,
    credentials: 'include'
  };

  if (body) {
    newOptions.body = body;
  }

  return newOptions;
}
