"use client";

import { addYarn, editYarn, getYarnById } from "@lib/api";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { yarnOptions, fields } from "@constants/yarn";
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
      reset(initialFormState);
    } catch (err) {
      console.error("Error saving yarn:", err);
    }
  };

  // Use default values or pre-populate based on query params
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

  return (
    <div className="py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 pb-6">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            {field.name === "brand" ? (
              <select
                {...register(field.name as keyof YarnSchemaType)}
                onChange={(e) => {
                  const brand = e.target.value;
                  setSelectedBrand(brand);
                  setValue("brand", brand);
                  setValue("yarnType", "");
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
                {...register(field.name as keyof YarnSchemaType)}
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
                {...register(field.name as keyof YarnSchemaType)}
                value={watch(field.name as keyof YarnSchemaType) ?? ""}
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
                {...register(field.name as keyof YarnSchemaType)}
                placeholder={field.placeholder}
                className="block w-full border p-2"
              />
            )}

            {errors[field.name as keyof YarnSchemaType] && (
              <span className="text-red-500">
                {errors[field.name as keyof YarnSchemaType]?.message}
              </span>
            )}
          </div>
        ))}

        <input
          type="number"
          {...register("qty", { valueAsNumber: true })}
          step="0.5"
          placeholder="# of Skeins*"
          className="block w-full border p-2"
        />

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
        ariaLabel="Return to Stash"
        text="Return to Stash"
      />
    </div>
  );
};

export default YarnForm;
