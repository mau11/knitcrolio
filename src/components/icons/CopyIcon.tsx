import { IconBaseProps } from "react-icons";
import { FaRegCopy } from "react-icons/fa";

export const CopyIcon = ({
  color = "oklch(62.3% 0.214 259.815)", // tailwind blue-500,
  title = "Copy",
  ...rest
}: IconBaseProps) => {
  return (
    <FaRegCopy
      color={color}
      title={title}
      size={20}
      {...rest}
      className="cursor-pointer opacity-60 hover:opacity-100"
    />
  );
};
