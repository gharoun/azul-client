import React from "react";
import { Columns, Movie, Pagination } from "../../interfaces/interfaces";
import _ from "lodash";
interface Props {
  data: Pagination;
  columns: Columns[];
}
const TableBody = ({ data, columns }: Props) => {
  const renderCell = (item: Movie, column: Columns) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  const createKey = (item: Movie, column: Columns) => {
    return item._id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.items.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
