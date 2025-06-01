import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "delete";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnClass?: ButtonVariant;
  text: string;
  ariaLabel: string;
  disabled?: boolean;
}

export const Button = ({
  btnClass = "primary",
  text,
  ariaLabel,
  type = "button",
  disabled = false,
  onClick,

  ...rest
}: ButtonProps) => {
  const baseClass =
    "focus:outline-none transition-colors duration-200 cursor-pointer hover:shadow-md";

  const styles: Record<ButtonVariant, string> = {
    primary: "px-4 py-2 rounded bg-aqua text-white font-bold hover:bg-aqua",
    secondary: "px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600",
    delete: "px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseClass} ${styles[btnClass]} ${
        disabled ?? "opacity-50 cursor-not-allowed"
      }`}
      {...rest}
    >
      {text}
    </button>
  );
};
