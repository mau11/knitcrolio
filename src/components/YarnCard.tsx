"use client";

import { Yarn } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import YarnImage from "./YarnImage";
import { Button } from "@components/Button";

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
    <div className="rounded-2xl bg-white shadow-md md:p-6 p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
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
        <YarnImage imageUrl={yarn.imageUrl} />
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

export default YarnCard;
