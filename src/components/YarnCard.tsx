"use client";

import { Yarn } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

type YarnCardProps = {
  yarn: Yarn;
  onDelete: (id: number) => void;
};

const YarnCard = ({ yarn, onDelete }: YarnCardProps) => {
  const {
    brand,
    yarnType,
    color,
    colorFamily,
    weight,
    material,
    care,
    skeinWeight,
    qty,
    notes,
    id,
  } = yarn;

  const router = useRouter();
  const pathname = usePathname();

  const handleCopy = () => {
    // Navigate to YarnForm with pre-populated fields using query parameters
    const query = new URLSearchParams({
      brand,
      yarnType,
      color,
      colorFamily,
      weight,
      material,
      care: care ?? "",
      skeinWeight: skeinWeight ?? "",
      qty: qty.toString(),
      notes: notes ?? "",
    }).toString();

    const copyUrl = `${pathname}/new?${query}`;

    router.push(copyUrl);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${brand} - ${yarnType}"?`
    );
    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="mb-2">
        {brand} - {yarnType}
      </h2>
      <div className="text-gray-700 space-y-1 text-sm">
        <p>
          <span className="font-semibold">Color:</span> {color}
        </p>
        <p>
          <span className="font-semibold">Quantity:</span> {qty}
        </p>
      </div>
      <div>
        <button
          onClick={handleCopy}
          className="mt-4 inline-block text-sm text-blue-500 hover:text-blue-900 hover:underline transition-colors"
        >
          Copy
        </button>
        <button
          onClick={handleDelete}
          className="mt-4 inline-block text-sm text-red-600 hover:text-red-800 hover:underline transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default YarnCard;
