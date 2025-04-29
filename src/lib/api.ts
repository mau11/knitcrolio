import { YarnFormFields } from "@custom-types/yarn";

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

// Add new yarn
export const addYarn = (data: YarnFormFields) =>
  fetchAPI("/api/addYarn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// Delete yarn by id
export const deleteYarn = (id: number) =>
  fetchAPI(`/api/deleteYarn/${id}`, { method: "DELETE" });
