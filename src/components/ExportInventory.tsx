import { exportListToCSV } from "@utils/export";
import { Button } from "@components/Button";
import { InventoryExportRow } from "@custom-types/inventory";
import { Inventory } from "@prisma/client";

export const ExportInventory = ({ list }: { list: Inventory[] }) => {
  const handleExport = () => {
    const listToExport = list.map(({ value, price, ...rest }) => ({
      ...rest,
      value: Number(value),
      price: Number(price),
    }));
    exportListToCSV<InventoryExportRow>(listToExport, "my_product_inventory");
  };

  return (
    <Button
      text="Export as CSV"
      onClick={handleExport}
      ariaLabel="Export product list as csv"
    />
  );
};
