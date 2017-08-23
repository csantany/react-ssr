// Dependencies
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

// Redux Store
import configureStore from '../shared/configureStore';

// Containers
import App from 'containers/App';

// DOM
const rootElement = document.getElementById('root');

// Configuring Redux Store
const store = configureStore(window.initialState);

// App Wrapper
const renderApp = Component => {
  render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    rootElement
  );
};

// Rendering app
renderApp(App);

// HMR
if (module.hot) {
  module.hot.accept('containers/App', () => {
    renderApp(require('containers/App').default);
  });
}
