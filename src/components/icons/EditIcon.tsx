import { IconBaseProps } from "react-icons";
import { BiEditAlt } from "react-icons/bi";

export const EditIcon = ({
  color = "oklch(62.7% 0.194 149.214)", // tailwind green-600,
  title = "Edit",
  ...rest
}: IconBaseProps) => {
  return (
    <BiEditAlt
      color={color}
      title={title}
      size={22}
      {...rest}
      className="cursor-pointer opacity-60 hover:opacity-100"
    />
  );
};
