import { YarnWithoutId } from "@custom-types/yarn";
import { Yarn } from "@prisma/index";
import { exportListToCSV } from "@utils/export";
import { Button } from "@components/Button";

export const ExportYarn = ({ list }: { list: Yarn[] }) => {
  const handleExport = () => {
    const listToExport = list.map(({ id, ...rest }) => rest);
    exportListToCSV<YarnWithoutId>(listToExport, "my_yarn_inventory");
  };

  return (
    <Button
      text="Export as CSV"
      onClick={handleExport}
      ariaLabel="Export yarn list as csv"
    />
  );
};
