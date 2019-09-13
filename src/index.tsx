import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { BrowserRouter, Route } from 'react-router-dom';
import { StoresContext as Stores } from './contexts';
import stores from './stores';
import App from './App';

configure({ enforceActions: 'always' });

ReactDOM.render(
  // tslint:disable-next-line:jsx-wrap-multiline
  <Provider {...stores}>
    <Stores.Provider value={stores}>
      <BrowserRouter>
        <Route
          path="/"
          render={(props: any) => <App {...props} />}
        />
      </BrowserRouter>
    </Stores.Provider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
