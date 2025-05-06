"use client";

import { addYarn, editYarn, getYarnById } from "@lib/api";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { brands, colorFamilies, weights, yarnOptions } from "@constants/yarn";
import { yarnSchema, YarnSchemaType } from "@lib/schemas/yarnSchema";
import { Button } from "@components/Button";
import DOMPurify from "dompurify";
import { Input, TextArea, Select } from "@form/index";

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
    <div className="pb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 pb-6 flex-col gap-4"
      >
        <div className="flex flex-wrap gap-4">
          {/* Brand */}
          <div className="flex-1">
            <Select
              fieldName="brand"
              label="Brand"
              options={brands}
              placeholder="Select Brand"
              register={register}
              value={selectedBrand}
              error={errors.brand?.message}
              onChange={handleBrandChange}
            />
          </div>

          {/* Brand Yarn Type */}
          <div className="flex-1">
            <Select
              fieldName="yarnType"
              label="Select Yarn Type"
              options={yarnTypes}
              placeholder="Select Type"
              register={register}
              value={watch("yarnType")}
              error={errors.yarnType?.message}
              disabled={!selectedBrand}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Qty */}
          <div className="w-1/8 sm:w-1/12">
            <Input
              label="Qty"
              fieldName="qty"
              placeholder="# of Skeins"
              inputType="number"
              step="0.5"
              register={register}
              error={errors.qty?.message}
            />
          </div>

          {/* Color */}
          <div className="flex-1">
            <Input
              label="Color"
              fieldName="color"
              placeholder="Color"
              register={register}
              error={errors.color?.message}
            />
          </div>

          {/* Color Family */}
          <div className="flex-1">
            <Select
              fieldName="colorFamily"
              label="Color Family"
              options={colorFamilies}
              placeholder="Select Color"
              register={register}
              value={watch("colorFamily")}
              error={errors.colorFamily?.message}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Yarn Weight */}
          <div className="w-2/5 sm:w-1/4">
            <Select
              fieldName="weight"
              label="Yarn Weight"
              options={weights}
              placeholder="Select Weight"
              register={register}
              value={watch("weight")}
              error={errors.weight?.message}
            />
          </div>

          {/* Skein Weight */}
          <div className="flex-1 w-2/5 sm:w-1/6">
            <Input
              label="Skein Size"
              fieldName="skeinWeight"
              placeholder="10.5 oz"
              register={register}
              error={errors.skeinWeight?.message}
            />
          </div>

          {/* Material */}
          <div className="w-full sm:w-1/2 -mt-2 sm:mt-0">
            <Input
              label="Material"
              fieldName="material"
              placeholder="Fiber material"
              register={register}
              error={errors.material?.message}
            />
          </div>
        </div>

        {/* Care */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <Input
              label="Care"
              fieldName="care"
              placeholder="Care instructions"
              register={register}
              error={errors.care?.message}
            />
          </div>
        </div>

        {/* Notes section */}
        <div className="flex flex-wrap gap-4">
          <div className="w-full">
            <TextArea
              label="Notes"
              fieldName="notes"
              placeholder="lot #, storage location, etc"
              register={register}
              error={errors.notes?.message}
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <Input
              label="Image URL"
              fieldName="imageUrl"
              placeholder="https://www..."
              register={register}
              error={errors.imageUrl?.message}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            ariaLabel={formButtonLabel}
            text={formButtonLabel}
          />
        </div>
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
