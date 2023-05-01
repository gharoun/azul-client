import { Genre } from "../../interfaces/interfaces";

interface Props {
  onItemSelect: (genres: Genre) => void;
  items: Genre[];
  itemSelected: Genre | null;
}
const ListGroup = ({ onItemSelect, items, itemSelected }: Props) => {
  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>
      {items.map((item) => (
        <li
          className={
            item === itemSelected ? "list-group-item active" : "list-group-item"
          }
          key={item._id}
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
