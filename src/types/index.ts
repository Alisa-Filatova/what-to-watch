export interface Film {
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

export interface User {
  id: number;
  name: string;
}

export interface BaseComment {
  rating: number;
  comment: string;
}

export interface Comment extends BaseComment{
  id: number;
  user: User;
  date: string;
}

export interface AuthFields {
  email: string;
  password: string;
}

export interface UserFull extends User {
  email: string;
  avatar_url: string;
}
