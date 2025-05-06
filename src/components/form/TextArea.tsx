import { UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  label: string;
  fieldName: string;
  placeholder: string;
  error: string | undefined;
  register: UseFormRegister<any>;
}

export const TextArea = ({
  label,
  fieldName,
  placeholder,
  error,
  register,
}: TextAreaProps) => {
  return (
    <div className="relative mt-8">
      <label
        htmlFor={fieldName}
        className="absolute -top-3 left-1/2 -translate-x-1/2 px-1 bg-background text-gray-700 block text-sm font-medium w-max"
      >
        {label}
      </label>
      <textarea
        {...register(fieldName)}
        placeholder={placeholder}
        className={`block w-full border rounded-sm p-2 mt-1 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
