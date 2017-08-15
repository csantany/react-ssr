import React from 'react';
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom';
import routes from '../../shared/routes';

export default ({ server, location, context, store }) => {
  let router;

  if (server) {
    router = (
      <StaticRouter location={location} context={context}>
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
      </StaticRouter>
    );
  } else {
    router = (
      <BrowserRouter>
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <div>
      {router}
    </div>
  );
}
