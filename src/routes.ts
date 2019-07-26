import * as links from './links';
import Main from './routes/Main/Main';
import Login from './routes/Login/Login';
import Film from './routes/Film/Film';

export const ROUTES = [
  {
    path: links.getHomeUrl(),
    component: Main,
    exact: true,
  },
  {
    path: links.getLoginUrl(),
    component: Login,
    exact: true,
  },
  {
    path: links.getFilmUrl(':filmId'),
    component: Film,
  },
  // {
  //   path: links.getReviewUrl(':filmId'),
  //   component: '',
  // },
  // {
  //   path: links.getMyListUrl(),
  //   component: '',
  // },
];

