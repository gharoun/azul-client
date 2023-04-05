import { AiFillHeart, AiOutlineHeart } from "react-icons/Ai";

interface Props {
  liked?: boolean;
  onClick: () => void;
}
const Like = ({ liked, onClick }: Props) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      {!liked ? <AiOutlineHeart size={25} /> : <AiFillHeart size={25} />}
    </div>
  );
};

export default Like;
