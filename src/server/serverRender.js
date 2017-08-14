import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../app/containers/App';

export default function serverRender(stats) {
  return (req, res, next) => {
    const context = {};

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
          </head>
          <body>
            <div id="root">${html}</div>

            <script>
              window.__PRELOADED_STATE__ = {};
            </script>

            <script src="/main.js"></script>
          </body>
        </html>
      `);
    }
  }
}
