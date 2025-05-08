import { ChangeEvent } from "react";
import { UseFormRegister } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  fieldName: string;
  label: string;
  options: string[] | SelectOption[]; // Supports array of strings and enum maps
  placeholder: string;
  register: UseFormRegister<any>;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({
  fieldName,
  label,
  options,
  placeholder,
  register,
  value,
  error,
  disabled = false,
  onChange,
}: SelectProps) => {
  const isStringArray = typeof options[0] === "string";

  const renderOptions = () => {
    return isStringArray
      ? (options as string[]).map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))
      : (options as SelectOption[]).map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ));
  };
  const renderSelect = () => {
    if (onChange) {
      return (
        <select
          {...register(fieldName)}
          className={`block w-full border rounded-sm p-2 ${
            error ? "border-red-500" : "border-gray-400"
          }`}
          disabled={disabled}
          onChange={onChange}
          value={value}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {renderOptions()}
        </select>
      );
    } else {
      return (
        <select
          {...register(fieldName)}
          className={`block w-full border rounded-sm p-2 ${
            error ? "border-red-500" : "border-gray-400"
          }`}
          disabled={disabled}
          value={value}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {renderOptions()}
        </select>
      );
    }
  };

  return (
    <div className="relative mt-8">
      <label
        htmlFor={fieldName}
        className="absolute -top-3 left-1/2 -translate-x-1/2 px-1 w-max bg-background text-gray-700 block text-sm font-medium"
      >
        {label}
      </label>
      {renderSelect()}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};
