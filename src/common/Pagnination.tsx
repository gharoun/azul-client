import { useState } from "react";
import { Pagination } from "../interfaces/interfaces";

interface Props {
  movies: Pagination;
  onClick: (page: number) => void;
}

const Pagnination = ({ movies, onClick }: Props) => {
  const pages = [];
  for (let i = 1; i <= movies.totalPages; i++) {
    pages.push(
      <li
        key={i}
        className={`page-item ${movies.currentPage === i && "active"}`}
        onClick={() => {
          onClick(i);
        }}
      >
        <span className="page-link">{i}</span>
      </li>
    );
  }
  if (pages.length === 1) return <div></div>;
  return (
    <ul className="pagination">
      <li
        className={`page-item ${movies.currentPage === 1 && "disabled"}`}
        onClick={() => {
          onClick(
            movies.currentPage > 1 ? movies.currentPage - 1 : movies.currentPage
          );
        }}
      >
        <span className="page-link">Previous</span>
      </li>
      {pages}
      <li
        className={`page-item ${
          movies.currentPage === movies.totalPages && "disabled"
        }`}
        onClick={() => {
          onClick(
            movies.currentPage < movies.totalPages
              ? movies.currentPage + 1
              : movies.currentPage
          );
        }}
      >
        <span className="page-link">Next</span>
      </li>
    </ul>
  );
};

export default Pagnination;
