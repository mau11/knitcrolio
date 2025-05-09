"use client";

import { Inventory } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@components/Button";

type ProductCardProps = {
  product: Inventory;
  onDelete: (id: number) => void;
};

const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  const { name, qty, id } = product;

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (action: "copy" | "edit") => {
    // Navigate to InventoryForm with pre-populated fields using query parameters
    const query = new URLSearchParams({
      id: id.toString(),
      action,
    }).toString();

    action === "copy" && router.push(`${pathname}/new?${query}`);
    action === "edit" && router.push(`${pathname}/edit?${query}`);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );
    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-md md:p-6 p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <h2 className="mb-2">{name}</h2>
      <div className="flex justify-between">
        <div className="text-gray-700 space-y-1 text-sm">
          <p>
            <span className="font-semibold">Quantity:</span> {qty}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={() => handleClick("copy")}
          btnClass="blueLink"
          text="Copy"
          ariaLabel="Copy"
        />
        <Button
          onClick={() => handleClick("edit")}
          btnClass="greenLink"
          text="Edit"
          ariaLabel="Edit"
        />
        <Button
          onClick={handleDelete}
          btnClass="redLink"
          text="Delete"
          ariaLabel="Delete"
        />
      </div>
    </div>
  );
};

export default ProductCard;
