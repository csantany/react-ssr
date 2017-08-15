import { isDefined, isBrowser } from './is';

export function getInitialData(props) {
  let initialData = {};

  if (props.staticContext && props.staticContext.initialData) {
    initialData = props.staticContext.initialData;
  } else if (isBrowser()) {
    initialData = window.__initialData__;

    delete window.__initialData__;
  }

  return initialData;
}

export function fetchInitialData(currentRoute) {
  if (currentRoute && currentRoute.component && currentRoute.component.requestInitialData) {
    return currentRoute.component.requestInitialData();
  } else if (typeof window !== 'undefined') {
    return window.__initialData__;
  }
  
  return null;
}

export function isFirstRender(items) {
  return !isDefined(items) || items.length === 0 || Object.keys(items).length === 0;
}
