"use client";

import { Inventory } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { Link } from "@components/Link";
import { useCallback } from "react";

type ProductCardProps = {
  product: Inventory;
  onDelete: (id: number) => void;
};

const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  const { name, variant, qty, id, size } = product;

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(
    (action: "copy" | "edit") => {
      // Navigate to InventoryForm with pre-populated fields using query parameters
      const query = new URLSearchParams({
        id: id.toString(),
        action,
      }).toString();

      action === "copy" && router.push(`${pathname}/new?${query}`);
      action === "edit" && router.push(`${pathname}/edit?${query}`);
    },
    [id, router]
  );

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );
    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <article className="rounded-2xl bg-white shadow-md md:p-6 p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between gap-2">
      <div className="flex justify-between">
        <div className="text-gray-700 space-y-1 text-sm">
          <p className="font-semibold">{variant}</p>
          <p>
            <span className="font-semibold">Size:</span> {size}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {qty}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <Link
          onClick={() => handleClick("copy")}
          linkClass="blueLink"
          text="Copy"
          ariaLabel="Copy"
        />
        <Link
          onClick={() => handleClick("edit")}
          linkClass="greenLink"
          text="Edit"
          ariaLabel="Edit"
        />
        <Link
          onClick={handleDelete}
          linkClass="redLink"
          text="Delete"
          ariaLabel="Delete"
        />
      </div>
    </article>
  );
};

export default ProductCard;
