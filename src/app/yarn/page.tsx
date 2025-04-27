"use client";

import { useEffect, useState } from "react";
import YarnCard from "@components/YarnCard";
import YarnForm from "@components/YarnForm";
import { getYarn } from "@lib/api";
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

  return (
    <div className="py-4">
      <h1 className="text-2xl mb-4">My Yarn Stash</h1>
      <button
        onClick={() => router.push("/yarn/new")}
        className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
        aria-label="Add new yarn"
      >
        Add New Yarn
      </button>
      {stash?.length > 0 ? (
        <section>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {stash.map((yarn) => (
              <YarnCard key={yarn.id} yarn={yarn} />
            ))}
          </div>
        </section>
      ) : (
        <>
          <p>Your yarn stash is empty :(. Add new yarn below:</p>
          <YarnForm />
        </>
      )}
    </div>
  );
};
export default YarnPage;
