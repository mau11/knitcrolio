"use client";

import { Yarn } from "@prisma/client";
import { useRouter } from "next/navigation";
import YarnImage from "@components/YarnImage";
import { MouseEvent, useCallback } from "react";
import { Link } from "@components/Link";
import { DeleteIcon } from "@icons/DeleteIcon";

type YarnCardProps = {
  yarn: Yarn;
  onDelete: (id: number) => void;
};

const YarnCard = ({ yarn, onDelete }: YarnCardProps) => {
  const { brand, yarnType, color, qty, id } = yarn;

  const router = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, action: "copy" | "edit") => {
      e.stopPropagation();

      // Navigate to YarnForm with pre-populated fields using query parameters
      const query = new URLSearchParams({
        id: id.toString(),
        action,
      }).toString();

      const basePath = "/yarn";

      action === "copy" && router.push(`${basePath}/new?${query}`);
      action === "edit" && router.push(`${basePath}/edit?${query}`);
    },
    [id, router]
  );

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const confirmed = window.confirm(
        `Are you sure you want to delete your "${color} (${yarnType}) yarn"?`
      );
      if (confirmed) {
        onDelete(id);
      }
    },
    [color, yarnType, id, onDelete]
  );

  return (
    <article
      className="rounded-2xl bg-white shadow-md md:p-6 p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between cursor-pointer"
      onClick={() => {
        router.push(`/yarn/${id}`);
      }}
    >
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
      <div className="flex justify-between mt-4">
        <Link
          onClick={(e) => handleClick(e, "copy")}
          linkClass="blueLink"
          text="Copy"
          ariaLabel="Copy"
        />
        <Link
          onClick={(e) => handleClick(e, "edit")}
          linkClass="greenLink"
          text="Edit"
          ariaLabel="Edit"
        />
        <button onClick={handleDelete} aria-label="Delete Yarn">
          <DeleteIcon title="Delete Yarn" />
        </button>
      </div>
    </article>
  );
};

export default YarnCard;
