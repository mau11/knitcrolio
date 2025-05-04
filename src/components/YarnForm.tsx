"use client";

import { addYarn, editYarn, getYarnById } from "@lib/api";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { brands, colorFamilies, weights, yarnOptions } from "@constants/yarn";
import { yarnSchema, YarnSchemaType } from "@lib/schemas/yarnSchema";
import { Button } from "@components/Button";
import DOMPurify from "dompurify";

const initialFormState: YarnSchemaType = {
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
  imageUrl: "",
};

const YarnForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    setValue,
    setError,
    watch,
  } = useForm<YarnSchemaType>({
    defaultValues: initialFormState,
  });

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [yarnTypes, setYarnTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageError, setPageError] = useState<string>("");

  const router = useRouter();
  const params = useSearchParams();
  const queryObject = Object.fromEntries(params.entries());
  const pathname = usePathname();
  const sanitize = (input: string) => DOMPurify.sanitize(input);

  const onSubmit = async (rawData: YarnSchemaType) => {
    const parsed = yarnSchema.safeParse(rawData);

    if (!parsed.success) {
      parsed.error.errors.forEach((err) => {
        const field = err.path[0] as keyof YarnSchemaType;
        setError(field, { message: err.message });
      });
      return;
    }

    const data = {
      ...parsed.data,
      color: sanitize(parsed.data.color),
      material: sanitize(parsed.data.material),
      care: sanitize(parsed.data.care || ""),
      skeinWeight: sanitize(parsed.data.skeinWeight || ""),
      notes: sanitize(parsed.data.notes || ""),
      imageUrl: sanitize(parsed.data.imageUrl || ""),
    };

    try {
      if (queryObject.id && queryObject.action === "edit") {
        await editYarn(data, Number(queryObject.id));
      } else {
        await addYarn(data);
      }
      router.replace(pathname);
      setSelectedBrand("");
      reset(initialFormState);
    } catch (err) {
      console.error("Error saving yarn:", err);
    }
  };

  useEffect(() => {
    const fetchYarn = async (paramId: number) => {
      try {
        const response = await getYarnById(paramId);
        setSelectedBrand(response.brand);
        const { id, ...responseWithoutId } = response;
        reset(responseWithoutId as YarnSchemaType);
      } catch (err) {
        console.error("Failed to load yarn", err);
        setPageError("Failed to load yarn");
      } finally {
        setLoading(false);
      }
    };
    if (queryObject.id && queryObject.action) {
      fetchYarn(Number(queryObject.id));
    } else {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (selectedBrand) {
      setYarnTypes(
        yarnOptions[selectedBrand as keyof typeof yarnOptions] || []
      );
    }
  }, [selectedBrand, setValue]);

  if (loading) return <p>Loading...</p>;
  if (pageError) return <p>{pageError}</p>;

  const formButtonLabel = isSubmitting
    ? queryObject.action === "edit"
      ? "Updating..."
      : "Adding..."
    : queryObject.action === "edit"
    ? "Update Yarn"
    : "Add Yarn";

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setValue("brand", brand);
    setValue("yarnType", "");
  };

  return (
    <div className="py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 pb-6">
        <div className="flex flex-wrap gap-4">
          {/* Brand */}
          <div className="flex-1">
            <label htmlFor="brand" className="block text-sm font-medium">
              Brand
            </label>
            <select
              {...register("brand")}
              onChange={handleBrandChange}
              value={selectedBrand}
              className="block w-full border p-2 mt-1"
            >
              <option value="" disabled>
                Select Brand
              </option>
              {brands.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brand.message}
              </p>
            )}
          </div>

          {/* Brand Yarn Type */}
          <div className="flex-1">
            <label htmlFor="yarnType" className="block text-sm font-medium">
              Yarn Type
            </label>
            <select
              {...register("yarnType")}
              disabled={!selectedBrand}
              value={watch("yarnType")}
              className="block w-full border p-2 mt-1"
            >
              <option value="" disabled>
                Select Yarn Type
              </option>
              {yarnTypes.map((yarnType, index) => (
                <option key={index} value={yarnType}>
                  {yarnType}
                </option>
              ))}
            </select>
            {errors.yarnType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.yarnType.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Qty */}
          <div className="w-1/8 sm:w-1/12">
            <label htmlFor="qty" className="block text-sm font-medium">
              Quantity
            </label>
            <input
              {...register("qty", { valueAsNumber: true })}
              type="number"
              step="0.5"
              placeholder="# of Skeins"
              className="block w-full border p-2 mt-1"
            />
            {errors.qty && (
              <p className="text-red-500 text-sm mt-1">{errors.qty.message}</p>
            )}
          </div>

          {/* Color */}
          <div className="flex-1">
            <label htmlFor="color" className="block text-sm font-medium">
              Color
            </label>
            <input
              {...register("color")}
              placeholder="Color"
              className="block w-full border p-2 mt-1"
            />
            {errors.color && (
              <p className="text-red-500 text-sm mt-1">
                {errors.color.message}
              </p>
            )}
          </div>

          {/* Color Family */}
          <div className="flex-1">
            <label htmlFor="colorFamily" className="block text-sm font-medium">
              Color Family
            </label>
            <select
              {...register("colorFamily")}
              className="block w-full border p-2 mt-1"
              value={watch("colorFamily")}
            >
              <option value="" disabled>
                Color Family
              </option>
              {colorFamilies.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.colorFamily && (
              <p className="text-red-500 text-sm mt-1">
                {errors.colorFamily.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Yarn Weight */}
          <div className="w-2/5 sm:w-1/4">
            <label htmlFor="weight" className="block text-sm font-medium">
              Yarn Weight
            </label>

            <select
              {...register("weight")}
              className="block w-full border p-2 mt-1"
              value={watch("weight")}
            >
              <option value="" disabled>
                Yarn Weight
              </option>
              {weights.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.weight && (
              <p className="text-red-500 text-sm mt-1">
                {errors.weight.message}
              </p>
            )}
          </div>

          {/* Skein Weight */}
          <div className="flex-1 w-2/5 sm:w-1/6">
            <label htmlFor="skeinWeight" className="block text-sm font-medium">
              Skein Weight
            </label>
            <input
              {...register("skeinWeight")}
              placeholder="Skein Weight"
              className="block w-full border p-2 mt-1"
            />
            {errors.skeinWeight && (
              <p className="text-red-500 text-sm mt-1">
                {errors.skeinWeight.message}
              </p>
            )}
          </div>

          {/* Material */}
          <div className="w-full sm:w-1/2">
            <label htmlFor="material" className="block text-sm font-medium">
              Material
            </label>
            <input
              {...register("material")}
              placeholder="Material"
              className="block w-full border p-2 mt-1"
            />
            {errors.material && (
              <p className="text-red-500 text-sm mt-1">
                {errors.material.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Care */}
          <div className="flex-1">
            <label htmlFor="care" className="block text-sm font-medium">
              Care
            </label>
            <input
              {...register("care")}
              placeholder="Care instructions"
              className="block w-full border p-2 mt-1"
            />
            {errors.care && (
              <p className="text-red-500 text-sm mt-1">{errors.care.message}</p>
            )}
          </div>
        </div>

        {/* Notes section */}
        <div className="w-full">
          <label htmlFor="notes" className="block text-sm font-medium">
            Notes
          </label>
          <textarea
            {...register("notes")}
            placeholder="lot #, storage location, etc"
            className="block w-full border p-2 mt-1"
          />
          {errors.notes && (
            <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="flex-1">
          <label htmlFor="imageUrl" className="block text-sm font-medium">
            Image URL
          </label>
          <input
            {...register("imageUrl")}
            placeholder="https://www..."
            className="block w-full border p-2 mt-1"
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.imageUrl.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          ariaLabel={formButtonLabel}
          text={formButtonLabel}
        />
      </form>
      <Button
        disabled={isSubmitting}
        onClick={() => router.push("/yarn")}
        ariaLabel="Cancel"
        text={"Cancel"}
      />
    </div>
  );
};

export default YarnForm;
