"use client";

import { useEffect, useState } from "react";
import YarnCard from "@components/YarnCard";
import { getYarn, deleteYarn } from "@lib/api";
import { Yarn as YarnType } from "@prisma/client";
import { useRouter } from "next/navigation";

const YarnPage = () => {
  const [stash, setStash] = useState<YarnType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchStash = async () => {
      try {
        const response = await getYarn();
        setStash(response);
      } catch (err) {
        setError("Failed to load yarn stash. Please try again.");
        console.error("Failed to fetch yarn stash:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStash();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleDelete = async (id: number) => {
    try {
      await deleteYarn(id);
      setStash((prev) => prev.filter((y) => y.id !== id));
    } catch (err) {
      console.error("Error deleting yarn:", err);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-2xl mb-4">My Yarn Stash</h1>
      {stash?.length > 0 ? (
        <section>
          <button
            onClick={() => router.push("/yarn/new")}
            className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
            aria-label="Add new yarn"
          >
            Add New Yarn
          </button>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mt-6">
            {stash.map((yarn) => (
              <YarnCard key={yarn.id} yarn={yarn} onDelete={handleDelete} />
            ))}
          </div>
        </section>
      ) : (
        <>
          <p>Your yarn stash is empty :(.</p>
          <button
            onClick={() => router.push("/yarn/new")}
            className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
            aria-label="Add new yarn"
          >
            Add New Yarn
          </button>
        </>
      )}
    </div>
  );
};
export default YarnPage;
