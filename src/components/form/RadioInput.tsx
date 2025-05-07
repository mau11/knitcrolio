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
    <fieldset className="mt-8 block border border-gray-400 rounded-sm p-2 relative">
      <legend className="absolute -top-3 left-1/2 -translate-x-1/2 px-1 bg-background text-gray-700 block text-sm font-medium w-max">
        {label}
      </legend>
      <div>
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              value={option.value}
              {...register(fieldName)}
              className="border-gray-400"
            />
            <span>{option.label}</span>
          </label>
        ))}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </fieldset>
  );
};
