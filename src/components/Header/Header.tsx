import React from 'react';
import Logo from '../Logo/Logo';

interface Props {
  pageTitle?: string;
  user?: {};
  prefix?: string;
}

class Header extends React.PureComponent<Props> {
  render() {
    const { pageTitle, user, prefix = 'movie-card' } = this.props;
    return (
      <header className={`page-header ${prefix}__head`}>
        <Logo />
        {user && (
          <div className="user-block">
            <div className="user-block__avatar">
              <img
                src="img/avatar.jpg"
                alt="User avatar"
                width="63"
                height="63"
              />
            </div>
          </div>
        )}
        {pageTitle && <h1 className="page-title user-page__title">{pageTitle}</h1>}
      </header>
    );
  }
}

export default Header;
