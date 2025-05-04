"use client";

import { Yarn } from "@prisma/client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type YarnCardProps = {
  yarn: Yarn;
  onDelete: (id: number) => void;
};

const YarnCard = ({ yarn, onDelete }: YarnCardProps) => {
  const { brand, yarnType, color, qty, id } = yarn;

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (action: "copy" | "edit") => {
    // Navigate to YarnForm with pre-populated fields using query parameters
    const query = new URLSearchParams({
      id: id.toString(),
      action,
    }).toString();

    action === "copy" && router.push(`${pathname}/new?${query}`);
    action === "edit" && router.push(`${pathname}/edit?${query}`);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete your "${color} (${yarnType}) yarn"?`
    );
    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-md md:p-6 p-4 hover:shadow-lg transition-shadow duration-300">
      <h2 className="mb-2">
        {brand} - {yarnType}
      </h2>
      <div className="flex justify-between">
        <div className="text-gray-700 space-y-1 text-sm">
          <p>
            <span className="font-semibold">Color:</span> {color}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {qty}
          </p>
        </div>
        {yarn.imageUrl && (
          <div className="self-center border rounded-lg border-gray-300 overflow-hidden">
            <Image
              src={yarn.imageUrl}
              width={40}
              height={40}
              alt="Yarn preview"
            />
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => handleClick("copy")}
          className="mt-4 inline-block text-sm text-blue-500 hover:text-blue-900 hover:underline transition-colors"
        >
          Copy
        </button>
        <button
          onClick={() => handleClick("edit")}
          className="mt-4 inline-block text-sm text-green-600 hover:text-green-900 hover:underline transition-colors"
        >
          Edit
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
