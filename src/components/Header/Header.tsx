import React from 'react';
import Logo from '../Logo/Logo';
import { IUserResponse } from '../../types';
import Config from '../../config';
import { Link } from 'react-router-dom';
import { getMyListUrl } from '../../links';

interface Props {
  pageTitle?: string;
  user?: IUserResponse;
  prefix?: string;
}

class Header extends React.PureComponent<Props> {
  render() {
    const { pageTitle, user, prefix = 'movie-card' } = this.props;
    return (
      <header className={`page-header ${prefix}__head`}>
        <Logo />
        {user && (
          <Link to={getMyListUrl()} className="user-block">
            <div className="user-block__avatar">
              <img
                src={`${Config.SERVER_URL}${user.avatar_url}`}
                alt="User avatar"
                width="63"
                height="63"
              />
            </div>
          </Link>
        )}
        {pageTitle && <h1 className="page-title user-page__title">{pageTitle}</h1>}
      </header>
    );
  }
}

export default Header;
