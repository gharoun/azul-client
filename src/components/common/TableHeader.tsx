import { Columns, SortColumn } from "../../interfaces/interfaces";
import { HiSortAscending, HiSortDescending } from "react-icons/Hi";
interface Props {
  sortColumn: SortColumn;
  onSort: (path: SortColumn) => void;
  columns: Columns[];
}
const TableHeader = ({ sortColumn, onSort, columns }: Props) => {
  const raiseSort = (path: string) => {
    const sortColum = { ...sortColumn };
    if (sortColum.path === path)
      sortColum.order = sortColum.order === "asc" ? "desc" : "asc";
    else {
      sortColum.path = path;
      sortColum.order = "asc";
    }
    onSort(sortColum);
  };
  const renderSortIcon = (column: Columns) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <HiSortAscending />;
    return <HiSortDescending />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            onClick={() => raiseSort(column.path)}
            key={column.path || column.key}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
