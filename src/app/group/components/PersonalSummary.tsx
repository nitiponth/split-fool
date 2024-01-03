import { Typography } from "@mui/material";
import { toAmountString } from "../../utils/common";

interface Props {
  name: string;
  amount: number;
  type: Transaction;
}

export type Transaction = "owed" | "borrowed";

const PersonalSummary = ({ name, amount, type }: Props) => {
  const amountClass = type === "owed" ? "text-red-500" : "text-green-500";

  return (
    <div className="flex w-full gap-2">
      <div className="w-8">
        <Typography variant="body2" className="text-center ">
          -
        </Typography>
      </div>
      <div>
        <Typography variant="body2" className="flex items-end text-gray-300">
          {type === "owed" && <span className="mr-1">You owe</span>}
          <span className="mr-1">{name}</span>
          {type === "borrowed" && <span className="mr-1">owes you</span>}
          <span className={amountClass}>{toAmountString(amount)}</span>
        </Typography>
      </div>
    </div>
  );
};

export default PersonalSummary;
