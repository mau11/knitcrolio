import YarnImage from "@components/YarnImage";
import { UseFormRegister } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
  imgSrc?: string | null;
}

interface CheckboxInputProps {
  label: string;
  fieldName: string;
  options: SelectOption[];
  register: UseFormRegister<any>;
  error?: string;
  showImage?: boolean;
}

export const CheckboxInput = ({
  label,
  fieldName,
  options,
  register,
  error,
  showImage = false,
}: CheckboxInputProps) => {
  return (
    <div className="relative mt-8">
      <label className="absolute -top-3 left-1/2 -translate-x-1/2 px-1 w-max bg-background text-gray-700 block text-sm font-medium">
        {label}
      </label>
      <div
        className={`max-h-56 overflow-y-auto border rounded-sm p-3 space-y-2 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center space-x-2 text-sm"
          >
            <input
              type="checkbox"
              value={opt.value}
              {...register(fieldName)}
              className="rounded border-gray-300"
            />
            <span className="flex gap-1 items-center">
              {showImage && <YarnImage imageUrl={opt.imgSrc} size={24} />}
              {opt.label}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
