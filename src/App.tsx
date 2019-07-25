import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import SvgSprite from './components/SvgSprite/SvgSprite';
import { ROUTES } from './routes';

function App() {
  return (
    <>
      <SvgSprite />
      <Switch>
        {ROUTES.map((route) =>
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        )}
      </Switch>
    </>
  );
}

export default withRouter(App);
