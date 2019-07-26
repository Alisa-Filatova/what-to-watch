export interface IFilm {
  id: number;
  name: string;
  poster_image: string;
  preview_image: string;
  background_image: string;
  background_color: string;
  video_link: string;
  preview_video_link: string;
  description: string;
  rating: number;
  scores_count: number;
  director: string;
  starring: string[];
  run_time: number;
  genre: string;
  released: number;
  is_favorite: boolean;
}

export interface IUser {
  id: number;
  name: string;
}

export interface IBaseComment {
  rating: number;
  comment: string;
}

export interface IComment extends IBaseComment {
  id: number;
  user: IUser;
  date: string;
}

export interface IAuthFields {
  email: string;
  password: string;
}

export interface IUserFull extends IUser {
  email: string;
  avatar_url: string;
}

export interface IRouteMatch {}


