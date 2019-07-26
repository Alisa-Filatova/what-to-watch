import React from 'react';
import { Redirect } from 'react-router-dom';
import * as links from '../links';
// import stores from '../stores';

const authRequired = (WrappedComponent: React.ComponentType<any>, PlaceholderComponent?: React.ComponentType<any>) => (
  class extends React.Component<any> {
    render() {
      // if (stores.authStore.isAuthenticated) return <WrappedComponent {...this.props} />;

      return !!PlaceholderComponent
        ? <PlaceholderComponent />
        : <Redirect to={links.getHomeUrl()} />;
    }
  }
);

export default authRequired;
