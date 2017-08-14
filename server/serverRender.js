import { resolve } from 'path'
import { readFile } from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import configureStore from 'redux/store/configureStore'
import App from 'containers/App'

export default function serverRender (stats) {
  return (req, res, next) => {
    const context = {}

    // Compile an initial state
    const preloadedState = {}

    // Create a new Redux store instance
    const store = configureStore(preloadedState)

    const html = renderToString(
      <App
        server
        store={store}
        location={req.url}
        context={context}
      />
    )

    // Grab the initial state from our Redux store
    // const finalState = store.getState()

    if (context.url) {
      res.redirect(301, context.url)
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
            <div id="react-root">${html}</div>

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
