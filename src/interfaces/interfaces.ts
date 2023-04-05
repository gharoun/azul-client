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

export interface Pagination {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  items: Movie[];
}
