import React from 'react';
import { Link } from 'react-router-dom';
import { getHomeUrl } from '../../links';

interface Props {
  type: 'light' | 'origin';
}

const Logo = (props: Props) => (
  <div className="logo">
    <Link
      to={getHomeUrl()}
      className={`logo__link ${props.type === 'light' ? 'logo__link--light' : ''}`}
    >
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>
);

Logo.defaultProps = {
  type: 'origin',
};


export default Logo;
