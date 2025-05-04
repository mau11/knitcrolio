"use client";

import { useEffect, useState } from "react";
import YarnCard from "@components/YarnCard";
import { getYarn, deleteYarn } from "@lib/api";
import { Yarn as YarnType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ExportYarn } from "@components/ExportYarn";
import { Button } from "@components/Button";

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
          <div className="flex justify-between">
            <Button
              onClick={() => router.push("/yarn/new")}
              ariaLabel="Add new yarn"
              text="Add New Yarn"
            />
            <ExportYarn yarnList={stash} />
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
            {stash.map((yarn) => (
              <YarnCard key={yarn.id} yarn={yarn} onDelete={handleDelete} />
            ))}
          </div>
        </section>
      ) : (
        <>
          <p>Your yarn stash is empty :(.</p>
          <Button
            onClick={() => router.push("/yarn/new")}
            ariaLabel="Add new yarn"
            text="Add New Yarn"
          />
        </>
      )}
    </div>
  );
};
export default YarnPage;
