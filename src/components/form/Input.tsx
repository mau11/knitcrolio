import { UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  fieldName: string;
  inputType?: "number" | "text";
  step?: string;
  placeholder: string;
  error: string | undefined;
  register: UseFormRegister<any>;
}

export const Input = ({
  label,
  fieldName,
  inputType = "text",
  step,
  placeholder,
  error,
  register,
}: InputProps) => {
  return (
    <>
      <div className="relative mt-8">
        <label
          htmlFor={fieldName}
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-1 bg-background text-gray-700 block text-sm font-medium w-max"
        >
          {label}
        </label>
        <input
          {...register(fieldName, {
            valueAsNumber: inputType === "number",
          })}
          type={inputType}
          min={0}
          step={step}
          placeholder={placeholder}
          className={`block w-full border rounded-sm p-2 ${
            error ? "border-red-500" : "border-gray-400"
          }`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </>
  );
};
