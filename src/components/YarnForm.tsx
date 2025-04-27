"use client";

import { YarnFormFields } from "@custom-types/yarn";
import { addYarn } from "@lib/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const initialFormState: YarnFormFields = {
  brand: "",
  type: "",
  color: "",
  colorFamily: "",
  weight: "",
  material: "",
  care: "",
  lot: "",
  notes: "",
  qty: 1,
};

const YarnForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<YarnFormFields>({
    defaultValues: initialFormState,
  });

  const router = useRouter();

  const onSubmit = async (data: YarnFormFields) => {
    try {
      await addYarn(data);
      reset();
    } catch (err) {
      console.error("Error adding yarn:", err);
    }
  };

  const fields = [
    { name: "brand", placeholder: "Brand", required: true },
    { name: "type", placeholder: "Type", required: true },
    { name: "color", placeholder: "Color", required: true },
    { name: "colorFamily", placeholder: "Color Family", required: true },
    { name: "weight", placeholder: "Weight", required: true },
    { name: "material", placeholder: "Material", required: true },
    {
      name: "care",
      placeholder: "Care Instructions (optional)",
      required: false,
    },
    { name: "lot", placeholder: "Lot # (optional)", required: false },
    { name: "notes", placeholder: "Notes (optional)", required: false },
  ];

  return (
    <div className="py-4">
      <h1 className="text-2xl mb-4">Add New Yarn</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            <input
              {...register(field.name as keyof YarnFormFields, {
                required: field.required
                  ? `${field.placeholder} is required`
                  : false,
              })}
              placeholder={field.placeholder}
              className="block w-full border p-2"
            />
            {errors[field.name as keyof YarnFormFields] && (
              <span className="text-red-500">
                {errors[field.name as keyof YarnFormFields]?.message}
              </span>
            )}
          </div>
        ))}

        <input
          type="number"
          {...register("qty", {
            valueAsNumber: true,
            min: 1,
            required: "Quantity is required",
          })}
          placeholder="Quantity"
          className="block w-full border p-2"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
        >
          {isSubmitting ? "Adding..." : "Add Yarn"}
        </button>
      </form>
      <button
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
        onClick={() => router.push("/yarn")}
      >
        Return to Stash
      </button>
    </div>
  );
};

export default YarnForm;
