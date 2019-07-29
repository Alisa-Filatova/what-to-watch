import React from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import SvgSprite from './components/SvgSprite/SvgSprite';
import { ROUTES } from './routes';
import FilmsStore from './stores/filmsStore';
import UserStore from './stores/userStore';

interface StoreProps {
  filmsStore: FilmsStore;
  userStore: UserStore;
}

@inject('filmsStore', 'userStore')
@observer
class App extends React.Component<StoreProps & RouteComponentProps> {
  render() {
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
}

export default withRouter(App);
