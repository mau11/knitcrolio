import { YarnWithoutId } from "@custom-types/yarn";
import { Yarn } from "@prisma/index";
import { exportListToCSV } from "@utils/export";
import { Button } from "@components/Button";

export const ExportYarn = ({ yarnList }: { yarnList: Yarn[] }) => {
  const handleExport = () => {
    const yarnListToExport = yarnList.map(({ id, ...rest }) => rest);
    exportListToCSV<YarnWithoutId>(yarnListToExport, "my_yarn_inventory");
  };

  return (
    <Button
      text="Export as CSV"
      onClick={handleExport}
      ariaLabel="Export yarn list as csv"
    />
  );
};
