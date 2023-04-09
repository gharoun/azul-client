import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Columns, Pagination, SortColumn } from "../../interfaces/interfaces";

interface Props {
  columns: Columns[];
  sortColumn: SortColumn;
  onSort: (path: SortColumn) => void;
  data: Pagination;
}
const Table = ({ columns, sortColumn, onSort, data }: Props) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
