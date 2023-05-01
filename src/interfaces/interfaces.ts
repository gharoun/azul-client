import { ReactElement } from "react";

export interface Genre {
  _id?: string;
  name: string;
}

export interface Movie {
  _id: string;
  title: string;
  genre: Genre;
  numberInStock: number;
  dailyRentalRate: number;
  publishDate?: string;
  liked?: boolean;
}
export interface MovieFormSubmitType {
  _id?: string;
  title: string;
  genreId?: string;
  numberInStock: number;
  dailyRentalRate: number;
  publishDate?: string;
  liked?: boolean;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  items: Movie[];
}

export interface SortColumn {
  path: string;
  order: boolean | "asc" | "desc";
}
export interface Columns {
  label: string;
  path: string;
  key?: string;
  content?: (movie: Movie) => ReactElement;
}
