// Dependencies
import 'isomorphic-fetch';
import React from 'react';
import { matchPath } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

// Redux Store
import configureStore from '../shared/configureStore';

// Containers
import App from '../app/containers/App';

// Routes
import routes from '../shared/routes';

// HTML
import html from './html';

export default function serverRender() {
  return (req, res, next) => {
    // Configuring Redux Store
    const store = configureStore();

    const promises = routes.reduce((acc, route) => {
      if (matchPath(req.url, route) && route.component && route.component.initialAction) {
        acc.push(Promise.resolve(store.dispatch(route.component.initialAction())));
      }

      return acc;
    }, []);

    // We resolve the data promise
    Promise.all(promises)
      .then(() => {
        const context = {};

        const markup = renderToString(
          <Provider store={store}>
            <App
              server
              location={req.url}
              context={context}
            />
          </Provider>
        );

        const initialState = store.getState();

        if (context.url) {
          res.redirect(301, context.url);
        } else {
          res.send(html({
            markup,
            initialState
          }));
        }
      })
      .catch(e => {
        console.log('Promise error: ', e); // eslint-disable-line
      });
  };
}
