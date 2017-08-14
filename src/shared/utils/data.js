import { isDefined } from './is';

export function getInitialData(props) {
  if (props.staticContext && props.staticContext.initialData) {
    return props.staticContext.initialData;
  }

  return {};
}

export function fetchInitialData(currentRoute) {
  console.log('currentRoute', currentRoute);
  if (currentRoute && currentRoute.component && currentRoute.component.requestInitialData) {
    return currentRoute.component.requestInitialData();
  } else if (typeof window !== 'undefined') {
    console.log('entraaaaaa');
    return window.__initialData__;
  }
  return null;
}

export function isFirstRender(items) {
  return !isDefined(items) || items.length === 0 || Object.keys(items).length === 0;
}
