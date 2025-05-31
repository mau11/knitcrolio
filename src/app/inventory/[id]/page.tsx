"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteProduct, getProductById } from "@lib/api";
import { Inventory } from "@prisma/client";
import { Link } from "@components/Link";
import { Decimal } from "@prisma/client/runtime/library";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Missing product ID.");
        throw new Error("No product ID provided.");
      }
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!product || !id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;
    try {
      await deleteProduct(Number(id));
      router.push("/inventory");
    } catch (err) {
      alert("Something went wrong while deleting.");
      console.error("Error deleting product:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error || !product) return <p>{error || "Product not found."}</p>;

  const productDetails = [
    { label: "Item", value: product.name },
    { label: "Craft", value: product.craft },
    { label: "Category", value: product.category },
    { label: "Size", value: product.size },
    { label: "Value", value: product.value, float: true },
    { label: "Price", value: product.price, float: true },
    { label: "Quantity", value: product.qty },
    { label: "Recipient", value: product.recipient },
    { label: "SKU", value: product.sku },
    { label: "Status", value: product.status },
    { label: "Shipping Tier", value: product.shippingTier },
    { label: "Notes", value: product.notes },
  ];

  const formatPrice = (value: string | number | Decimal) =>
    `$${Number(value).toFixed(2)}`;

  return (
    <section className="py-4 max-w-4xl mx-auto">
      <h1 className="mb-0">
        {product.variant} {product.name}
      </h1>

      <div className="flex justify-between items-center mb-6">
        <Link
          onClick={() => router.push("/inventory")}
          linkClass="redLink"
          text="← Back to Inventory"
          ariaLabel="Back to Inventory"
        />
        <div className="flex gap-2 flex-wrap">
          <Link
            onClick={() =>
              router.push(`/inventory/edit?id=${product.id}&action=edit`)
            }
            linkClass="greenLink"
            text="Edit"
            ariaLabel="Edit Product"
          />
          <Link
            onClick={() =>
              router.push(`/inventory/new?id=${product.id}&action=copy`)
            }
            linkClass="blueLink"
            text="Copy"
            ariaLabel="Copy Product"
          />
          <Link
            onClick={handleDelete}
            linkClass="redLink"
            text="Delete"
            ariaLabel="Delete Product"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
        <dl className="flex-1 grid grid-cols-1 gap-4 text-gray-800 bg-white p-4 rounded-lg shadow-sm divide-y divide-gray-200">
          {productDetails.map(({ label, value, float = false }) => {
            let formattedValue = value;
            if (float && value) {
              formattedValue = formatPrice(value);
            }
            return (
              <div key={label}>
                <dt className="text-sm text-gray-500">{label}</dt>
                <dd>{formattedValue?.toString() || "—"}</dd>
              </div>
            );
          })}
        </dl>
      </div>
      <p className="text-end text-xs text-gray-500 mt-2 italic">
        Last Updated: {new Date(product.updatedAt).toDateString()}
      </p>
    </section>
  );
};

export default ProductDetailPage;
