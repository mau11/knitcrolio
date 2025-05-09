import { YarnSchemaType } from "@schemas/yarnSchema";
import { InventorySchemaType } from "./schemas/inventorySchema";

const fetchAPI = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorMessage = `${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
};

/**
 *
 * GET
 */

// Get yarn list
export const getYarn = () => fetchAPI("/api/getYarn");
// Get yarn by id
export const getYarnById = (id: number) => fetchAPI(`/api/getYarn/${id}`);

// Get product list
export const getProduct = () => fetchAPI("/api/getProduct");
// Get product by id
export const getProductById = (id: number) => fetchAPI(`/api/getProduct/${id}`);

/**
 *
 * POST
 */

// Add new yarn
export const addYarn = (data: YarnSchemaType) =>
  fetchAPI("/api/addYarn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// Add new product
export const addProduct = (data: InventorySchemaType) =>
  fetchAPI("/api/addProduct", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

/**
 *
 * PUT
 */

// Edit yarn
export const editYarn = (data: YarnSchemaType, id: number) =>
  fetchAPI(`/api/editYarn/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// Edit product
export const editProduct = (data: InventorySchemaType, id: number) =>
  fetchAPI(`/api/editProduct/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

/**
 *
 * DELETE
 */

// Delete yarn by id
export const deleteYarn = (id: number) =>
  fetchAPI(`/api/deleteYarn/${id}`, { method: "DELETE" });

// Delete product by id
export const deleteProduct = (id: number) =>
  fetchAPI(`/api/deleteProduct/${id}`, { method: "DELETE" });
