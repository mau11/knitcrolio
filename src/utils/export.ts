export const exportListToCSV = <
  T extends Record<string, string | number | null | undefined>
>(
  data: T[],
  fileName: string
): void => {
  if (!data || data.length === 0) return;

  // Define the CSV headers
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(",")];

  // Add each row
  for (const item of data) {
    const row = headers.map((header) => {
      const value = item[header as keyof typeof item];
      const stringValue =
        typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value;
      return stringValue ?? "";
    });
    csvRows.push(row.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};
