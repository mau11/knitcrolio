import { YarnFormFields } from "@custom-types/yarn";
import { Yarn } from "@prisma/index";

const fetchAPI = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorMessage = `${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
};

// Get yarn list
export const getYarn = () => fetchAPI("/api/getYarn");

// Get yarn by id
export const getYarnById = (id: number) => fetchAPI(`/api/getYarn/${id}`);

// Add new yarn
export const addYarn = (data: YarnFormFields) =>
  fetchAPI("/api/addYarn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// Edit yarn
export const editYarn = (data: YarnFormFields, id: number) =>
  fetchAPI(`/api/editYarn/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// Delete yarn by id
export const deleteYarn = (id: number) =>
  fetchAPI(`/api/deleteYarn/${id}`, { method: "DELETE" });
