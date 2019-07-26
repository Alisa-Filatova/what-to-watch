import React from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import SvgSprite from './components/SvgSprite/SvgSprite';
import { ROUTES } from './routes';
import FilmsStore from './stores/filmsStore';
import { inject, observer } from 'mobx-react';

interface StoreProps {
  filmsStore: FilmsStore;
}

@inject('filmsStore')
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
