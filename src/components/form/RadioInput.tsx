import { UseFormRegister } from "react-hook-form";

interface RadioInputProps {
  fieldName: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  register: UseFormRegister<any>;
  error?: string;
}

export const RadioInput = ({
  fieldName,
  label,
  options,
  error,
  register,
}: RadioInputProps) => {
  return (
    <>
      <fieldset
        className={`mt-8 block border border-gray-400 rounded-sm p-2 relative ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      >
        <legend className="absolute -top-3 left-1/2 -translate-x-1/2 px-1 bg-background text-gray-700 block text-sm font-medium w-max">
          {label}
        </legend>
        <div className="flex  space-x-2">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-1 px-1"
            >
              <input
                type="radio"
                value={option.value}
                {...register(fieldName)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};
