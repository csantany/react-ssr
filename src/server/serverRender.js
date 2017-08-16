// Dependencies
import 'isomorphic-fetch';
import React from 'react';
import serialize from 'serialize-javascript';
import { matchPath } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

// Containers
import App from '../app/containers/App';

// Routes
import routes from '../shared/routes';

// Utils
import { fetchInitialData } from '../shared/utils/data';

export default function serverRender() {
  return (req, res, next) => {
    // Match the current url with our routes
    const currentRoute = routes.find(route => matchPath(req.url, route));

    // If has data we fetch the initial data
    const requestInitialData = fetchInitialData(currentRoute);

    // We resolve the data promise
    Promise.resolve(requestInitialData)
      .then(initialData => {
        const context = {
          initialData
        };

        const html = renderToString(
          <App
            server
            location={req.url}
            context={context}
          />
        );

        if (context.url) {
          res.redirect(301, context.url);
        } else {
          res.send(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>React Server-Side Rendering</title>
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <link rel="stylesheet" href="/css/style.css" />
              </head>
              <body>
                <div id="root">${html}</div>

                <script>
                  window.__PRELOADED_STATE__ = {};
                  window.__initialData__ = ${serialize(initialData)}
                </script>

                <script src="/main.js"></script>
              </body>
            </html>
          `);
        }
      })
      .catch(e => {
        console.log('Promise error: ', e); // eslint-disable-line
      });
  };
}
