"use client";

import { YarnFormFields } from "@custom-types/yarn";
import { addYarn } from "@lib/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialFormState: YarnFormFields = {
  brand: "",
  yarnType: "",
  color: "",
  colorFamily: "",
  weight: "",
  material: "",
  care: "",
  skeinWeight: "",
  qty: 1,
  notes: "",
};

const YarnForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    setValue,
    watch,
  } = useForm<YarnFormFields>({
    defaultValues: initialFormState,
  });

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [yarnTypes, setYarnTypes] = useState<string[]>([]);
  const router = useRouter();

  const onSubmit = async (data: YarnFormFields) => {
    try {
      await addYarn(data);
      reset();
    } catch (err) {
      console.error("Error adding yarn:", err);
    }
  };

  const brands = [
    "Bernat",
    "Craftsmart",
    "Lion Brand",
    "Loops & Threads",
    "Red Heart",
    "Not Sure",
  ];
  const yarnOptions = {
    Bernat: ["Baby Blanket", "Blanket", "Mega Bulky"],
    Craftsmart: ["Value"],
    "Lion Brand": ["Wool-Ease Thick & Quick"],
    "Loops & Threads": ["Charisma"],
    "Red Heart": ["Soft Baby Steps", "Super Saver"],
    "Not Sure": ["Not Sure"],
  };
  const colorFamilies = [
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Purple",
    "Black",
    "Grey",
    "White",
    "Multi-color",
  ];
  const weights = [
    "0-Lace",
    "1-Super Fine",
    "2-Fine",
    "3-Light",
    "4-Medium",
    "5-Bulky",
    "6-Super Bulky",
    "7-Jumbo",
    "Not Sure",
  ];
  const fields = [
    { name: "brand", placeholder: "Brand", required: true, options: brands },
    {
      name: "yarnType",
      placeholder: "Yarn Type",
      required: true,
    },
    { name: "color", placeholder: "Color", required: true },
    {
      name: "colorFamily",
      placeholder: "Color Family",
      required: true,
      options: colorFamilies,
    },
    {
      name: "weight",
      placeholder: "Yarn Weight",
      required: true,
      options: weights,
    },
    { name: "material", placeholder: "Material", required: true },
    {
      name: "care",
      placeholder: "Care Instructions (optional)",
      required: false,
    },
    {
      name: "skeinWeight",
      placeholder: "Skein weight (optional)",
      required: false,
    },
    { name: "notes", placeholder: "Notes (optional)", required: false },
  ];

  useEffect(() => {
    if (selectedBrand) {
      setYarnTypes(
        yarnOptions[selectedBrand as keyof typeof yarnOptions] || []
      );
      setValue("yarnType", "");
    }
  }, [selectedBrand, setValue]);

  return (
    <div className="py-4">
      <h1 className="text-2xl mb-4">Add New Yarn</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            {field.name === "brand" ? (
              <select
                {...register(field.name as keyof YarnFormFields, {
                  required: field.required
                    ? `${field.placeholder} is required`
                    : false,
                })}
                onChange={(e) => {
                  const brand = e.target.value;
                  setSelectedBrand(brand);
                  setValue("brand", brand);
                }}
                value={selectedBrand}
                className="block w-full border p-2"
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.name === "yarnType" ? (
              <select
                {...register(field.name as keyof YarnFormFields, {
                  required: field.required
                    ? `${field.placeholder} is required`
                    : false,
                })}
                disabled={!selectedBrand}
                value={watch("yarnType")}
                className="block w-full border p-2"
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {yarnTypes.map((yarnType, index) => (
                  <option key={index} value={yarnType}>
                    {yarnType}
                  </option>
                ))}
              </select>
            ) : field.options ? (
              <select
                {...register(field.name as keyof YarnFormFields, {
                  required: field.required
                    ? `${field.placeholder} is required`
                    : false,
                })}
                value={watch(field.name as keyof YarnFormFields) ?? ""}
                className="block w-full border p-2"
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...register(field.name as keyof YarnFormFields, {
                  required: field.required
                    ? `${field.placeholder} is required`
                    : false,
                })}
                placeholder={field.placeholder}
                className="block w-full border p-2"
              />
            )}

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
            required: "Quantity is required",
            min: 0.5,
          })}
          step="0.5"
          placeholder="# of Skeins"
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
