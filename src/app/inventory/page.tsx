"use client";

import { useEffect, useState } from "react";
import { Inventory as InventoryType } from "@prisma/client";
import { Button } from "@components/Button";
import { useRouter } from "next/navigation";
import { deleteProduct, getProduct } from "@lib/api";
import ProductCard from "@components/ProductCard";

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await getProduct();
        setInventory(response);
      } catch (err) {
        setError("Failed to load inventory. Please try again.");
        console.error("Failed to fetch inventory:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const groupedInventory = inventory.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    acc[item.name].push(item);
    return acc;
  }, {} as Record<string, InventoryType[]>);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setInventory((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-2xl mb-4">My Product Inventory</h1>
      {inventory?.length > 0 ? (
        <section>
          <div className="flex justify-between">
            <Button
              onClick={() => router.push("/inventory/new")}
              ariaLabel="Add new products"
              text="Add New Products"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mt-6">
            {Object.entries(groupedInventory).map(([productName, items]) => (
              <div key={productName} className="mb-8">
                <h2 className="text-xl font-semibold mb-3">{productName}</h2>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                  {items.map((variant) => (
                    <ProductCard
                      key={variant.id}
                      product={variant}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          <p>Your inventory is empty :(.</p>
          <Button
            onClick={() => router.push("/inventory/new")}
            ariaLabel="Add new products"
            text="Add New Products"
          />
        </>
      )}
    </div>
  );
};
export default InventoryPage;
