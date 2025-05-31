import { IconBaseProps } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";

export const DeleteIcon = ({
  color = "oklch(57.7% 0.245 27.325)", // tailwind red-600,
  title = "Delete",
  ...rest
}: IconBaseProps) => {
  return (
    <FaTrashAlt
      color={color}
      title={title}
      size={18}
      {...rest}
      className="cursor-pointer opacity-60 hover:opacity-100"
    />
  );
};
