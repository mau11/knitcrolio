import { AnchorHTMLAttributes, MouseEvent } from "react";

type LinkVariant = "blueLink" | "greenLink" | "redLink";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  linkClass?: LinkVariant;
  text: string;
  ariaLabel: string;
  disabled?: boolean;
  className?: string;
}

export const Link = ({
  linkClass = "blueLink",
  text,
  ariaLabel,
  disabled = false,
  className = "",
  onClick,
  ...rest
}: LinkProps) => {
  const baseClass =
    "focus:outline-none transition-colors duration-200 cursor-pointer inline-block text-sm hover:underline ";

  const styles: Record<LinkVariant, string> = {
    blueLink: `${linkClass} text-blue-500 hover:text-blue-900 `,
    greenLink: `${linkClass} text-green-600 hover:text-green-900 `,
    redLink: `${linkClass} text-red-600 hover:text-red-800`,
  };

  const disabledClasses =
    disabled ?? "opacity-50 cursor-not-allowed pointer-events-none";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  const classNames = `${className} ${baseClass} ${styles[linkClass]} ${disabledClasses}`;

  return (
    <a
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className={classNames}
      {...rest}
    >
      {text}
    </a>
  );
};
