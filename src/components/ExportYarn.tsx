import { YarnWithoutId } from "@custom-types/yarn";
import { Yarn } from "@prisma/index";
import { exportListToCSV } from "@utils/export";

export const ExportYarn = ({ yarnList }: { yarnList: Yarn[] }) => {
  const handleExport = () => {
    const yarnListToExport = yarnList.map(({ id, ...rest }) => rest);
    exportListToCSV<YarnWithoutId>(yarnListToExport, "my_yarn_inventory");
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Export as CSV
    </button>
  );
};
