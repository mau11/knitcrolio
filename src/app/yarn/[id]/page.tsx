"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getYarnById, deleteYarn } from "@lib/api";
import { Yarn } from "@prisma/client";
import YarnImage from "@components/YarnImage";
import { Link } from "@components/Link";
import { DeleteIcon } from "@icons/DeleteIcon";

const YarnDetailPage = () => {
  const [yarn, setYarn] = useState<Yarn | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchYarn = async () => {
      if (!id) {
        setError("Missing yarn ID.");
        throw new Error("No yarn ID provided.");
      }
      try {
        const data = await getYarnById(Number(id));
        setYarn(data);
      } catch (err) {
        console.error("Error fetching yarn:", err);
        setError("Failed to load yarn details.");
      } finally {
        setLoading(false);
      }
    };

    fetchYarn();
  }, [id]);

  const handleDelete = async () => {
    if (!yarn || !id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete your "${yarn?.color} (${yarn?.yarnType})" yarn?`
    );

    if (!confirmed) return;
    try {
      await deleteYarn(Number(id));
      router.push("/yarn");
    } catch (err) {
      alert("Something went wrong while deleting.");
      console.error("Error deleting yarn:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error || !yarn) return <p>{error || "Yarn not found."}</p>;

  const yarnDetails = [
    { label: "Brand", value: yarn.brand },
    { label: "Yarn Type", value: yarn.yarnType },
    { label: "Color Family", value: yarn.colorFamily },
    { label: "Weight", value: yarn.weight },
    { label: "Material", value: yarn.material },
    { label: "Skein Weight", value: yarn.skeinWeight },
    { label: "Quantity", value: yarn.qty },
    { label: "Care Instructions", value: yarn.care },
    { label: "Notes", value: yarn.notes },
  ];

  return (
    <section className="py-4 max-w-4xl mx-auto">
      <h1 className="mb-0">{yarn.color}</h1>

      <div className="flex justify-between items-center mb-6 mt-4">
        <Link
          onClick={() => router.push("/yarn")}
          linkClass="redLink"
          text="← Back to Stash"
          ariaLabel="Back to yarn list"
        />
        <div className="flex gap-2 flex-wrap">
          <Link
            onClick={() => router.push(`/yarn/edit?id=${yarn.id}&action=edit`)}
            linkClass="greenLink"
            text="Edit"
            ariaLabel="Edit Yarn"
          />
          <Link
            onClick={() => router.push(`/yarn/new?id=${yarn.id}&action=copy`)}
            linkClass="blueLink"
            text="Copy"
            ariaLabel="Copy Yarn"
          />
          <button onClick={handleDelete} aria-label="Delete Yarn">
            <DeleteIcon title="Delete Yarn" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
        <div>
          <div className="shrink-0">
            <YarnImage imageUrl={yarn.imageUrl} size={100} />
          </div>
          <p className="text-xs text-gray-500 mt-2">Color: {yarn.color}</p>
        </div>

        <dl className="flex-1 grid grid-cols-1 gap-4 text-gray-800 bg-white p-4 rounded-lg shadow-sm divide-y divide-gray-200">
          {yarnDetails.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-sm text-gray-500">{label}</dt>
              <dd>{value || "—"}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="text-end text-xs text-gray-500 mt-2 italic">
        Last Updated: {new Date(yarn.updatedAt).toDateString()}
      </p>
    </section>
  );
};

export default YarnDetailPage;
