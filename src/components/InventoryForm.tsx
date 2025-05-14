"use client";

import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  InventorySchemaType,
  inventorySchema,
} from "@lib/schemas/inventorySchema";
import { Button } from "@components/Button";
import DOMPurify from "dompurify";
import {
  CheckboxInput,
  Input,
  RadioInput,
  Select,
  TextArea,
} from "@form/index";
import {
  categoryOptions,
  craftOptions,
  inventoryStatusOptions,
  shippingTierOptions,
  sizeOptions,
} from "@constants/inventory";
import { addProduct, getYarn } from "@lib/api";
import { Craft, InventoryStatus, Yarn } from "@prisma/client";

const initialFormState: InventorySchemaType = {
  name: "",
  craft: Craft.CROCHET,
  category: "",
  size: "",
  qty: 1,
  yarnUsed: [],
  variant: "",
  sku: "",
  notes: "",
  status: InventoryStatus.AVAILABLE,
  recipient: "",
  value: 1,
  price: 1,
  shippingTier: "",
};

const InventoryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    setError,
    watch,
  } = useForm<InventorySchemaType>({
    defaultValues: initialFormState,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [pageError, setPageError] = useState<string>("");
  const [yarnList, setYarnList] = useState<Yarn[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const sanitize = (input: string) => DOMPurify.sanitize(input);

  const onSubmit = async (rawData: InventorySchemaType) => {
    const parsed = inventorySchema.safeParse(rawData);
    if (!parsed.success) {
      parsed.error.errors.forEach((err) => {
        const field = err.path[0] as keyof InventorySchemaType;
        setError(field, { message: err.message });
      });
      return;
    }

    const data = {
      ...parsed.data,
      name: sanitize(parsed.data.name),
      notes: sanitize(parsed.data.notes || ""),
      recipient: sanitize(parsed.data.recipient || ""),
    };

    try {
      await addProduct(data);
      router.replace(pathname);
      reset(initialFormState);
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  useEffect(() => {
    const fetchYarnList = async () => {
      try {
        const response = await getYarn();
        setYarnList(response);
      } catch (err) {
        console.error("Failed to load yarn", err);
        setPageError("Failed to load yarn");
      } finally {
        setLoading(false);
      }
    };
    fetchYarnList();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (pageError) return <p>{pageError}</p>;

  const formButtonLabel = isSubmitting ? "Adding..." : "Add Product";

  const yarnOptions = yarnList.map((yarn: Yarn) => ({
    value: String(yarn.id),
    label: `${yarn.color} (${yarn.brand}: ${yarn.yarnType})`,
    imgSrc: yarn.imageUrl,
  }));

  return (
    <div className="pb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 pb-6 flex-col gap-4"
      >
        <div className="flex flex-wrap gap-4">
          {/* Craft Name */}
          <div className="">
            <RadioInput
              fieldName="craft"
              label="Craft*"
              options={craftOptions}
              register={register}
              error={errors.craft?.message}
            />
          </div>
          {/* Category */}
          <div className="flex-1">
            <Select
              fieldName="category"
              label="Category*"
              options={categoryOptions}
              placeholder="Select Category"
              register={register}
              value={watch("category")}
              error={errors.category?.message}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Qty */}
          <div className="w-1/8 sm:w-1/12">
            <Input
              label="Qty*"
              fieldName="qty"
              placeholder="# of Products"
              inputType="number"
              register={register}
              error={errors.qty?.message}
            />
          </div>
          {/* Status */}
          <div className="flex-1">
            <Select
              fieldName="status"
              label="Status*"
              options={inventoryStatusOptions}
              placeholder="Select Status"
              register={register}
              value={watch("status")}
              error={errors.status?.message}
            />
          </div>

          {/* Shipping Tier */}
          <div className="flex-1">
            <Select
              fieldName="shippingTier"
              label="Shipping Tier"
              options={shippingTierOptions}
              placeholder="Select Shipping"
              register={register}
              value={watch("shippingTier")}
              error={errors.shippingTier?.message}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Size */}
          <div className="flex-1 md:flex-none md:w-1/4">
            <Select
              fieldName="size"
              label="Size*"
              options={sizeOptions}
              placeholder="Select Size"
              register={register}
              value={watch("size")}
              error={errors.size?.message}
            />
          </div>
          {/* Variant Name */}
          <div className="flex-1">
            <Input
              label="Variant Name*"
              fieldName="variant"
              placeholder="Variant name"
              register={register}
              error={errors.variant?.message}
            />
          </div>
          {/* SKU */}
          <div className="w-1/6 sm:w-1/8">
            <Input
              label="SKU"
              fieldName="sku"
              placeholder="0001"
              register={register}
              error={errors.sku?.message}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Item Name */}
          <div className="flex-1">
            <Input
              label="Item Name*"
              fieldName="name"
              placeholder="Item name"
              register={register}
              error={errors.name?.message}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Yarn used */}
          <div className="flex-1">
            <CheckboxInput
              label="Yarn Used*"
              fieldName="yarnUsed"
              options={yarnOptions}
              register={register}
              error={errors.yarnUsed?.message}
              showImage
            />
          </div>

          {/* Notes section */}
          <div className="w-full sm:flex-1">
            <TextArea
              label="Notes"
              fieldName="notes"
              placeholder="Storage location, purpose, etc"
              register={register}
              error={errors.notes?.message}
              rows={6}
            />
          </div>
        </div>

        {/* Recipient Name */}
        <div className="flex-1">
          <Input
            label="Recipient Name"
            fieldName="recipient"
            placeholder="Recipient name"
            register={register}
            error={errors.recipient?.message}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Estimated Value */}
          <div className="flex-1">
            <Input
              label="Estimated Value*"
              fieldName="value"
              placeholder="Estimated value"
              inputType="number"
              step={0.01}
              register={register}
              error={errors.value?.message}
              min={1}
            />
          </div>

          {/* Listing Price */}
          <div className="flex-1">
            <Input
              label="Price*"
              fieldName="price"
              placeholder="Listing Price*"
              inputType="number"
              step={0.01}
              register={register}
              error={errors.price?.message}
              min={1}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <Button
            type="submit"
            disabled={isSubmitting}
            ariaLabel={formButtonLabel}
            text={formButtonLabel}
          />
        </div>
      </form>
      <Button
        btnClass="secondary"
        disabled={isSubmitting}
        onClick={() => router.push("/inventory")}
        ariaLabel="Cancel"
        text="Cancel"
        title="Return to Inventory"
      />
    </div>
  );
};

export default InventoryForm;
