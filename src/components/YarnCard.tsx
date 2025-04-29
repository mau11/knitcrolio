import { Yarn } from "@prisma/client";

type YarnCardProps = {
  yarn: Yarn;
  onDelete: (id: number) => void;
};

const YarnCard = ({ yarn, onDelete }: YarnCardProps) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${yarn.brand} - ${yarn.yarnType}"?`
    );
    if (confirmed) {
      onDelete(yarn.id);
    }
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">
        {yarn.brand} - {yarn.yarnType}
      </h2>
      <p>
        Color: {yarn.color} ({yarn.colorFamily})
      </p>
      <p>Weight: {yarn.weight}</p>
      <p>Material: {yarn.material}</p>
      <p>Qty: {yarn.qty}</p>
      <button
        onClick={handleDelete}
        className="mt-4 text-red-600 hover:underline text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default YarnCard;
