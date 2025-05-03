import { Yarn } from "@prisma/client";

type YarnCardProps = {
  yarn: Yarn;
  onDelete: (id: number) => void;
};

const YarnCard = ({ yarn, onDelete }: YarnCardProps) => {
  const { brand, yarnType, id, color, qty } = yarn;

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${brand} - ${yarnType}"?`
    );
    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="mb-2">
        {brand} - {yarnType}
      </h2>
      <div className="text-gray-700 space-y-1 text-sm">
        <p>
          <span className="font-semibold">Color:</span> {color}
        </p>
        <p>
          <span className="font-semibold">Quantity:</span> {qty}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="mt-4 inline-block text-sm text-red-600 hover:text-red-800 hover:underline transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

export default YarnCard;
