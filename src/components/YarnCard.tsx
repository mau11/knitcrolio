import { YarnFormFields } from "@custom-types/yarn";

const YarnCard = ({ yarn }: { yarn: YarnFormFields }) => {
  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">
        {yarn.brand} — {yarn.type}
      </h2>
      <p>
        Color: {yarn.color} ({yarn.colorFamily})
      </p>
      <p>Weight: {yarn.weight}</p>
      <p>Material: {yarn.material}</p>
      <p>Qty: {yarn.qty}</p>
    </div>
  );
};

export default YarnCard;
