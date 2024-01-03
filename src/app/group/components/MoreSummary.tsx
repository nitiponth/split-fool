import { Typography } from "@mui/material";

interface Props {
  numberOfLeft: number;
}

const MoreSummary = ({ numberOfLeft }: Props) => {
  return (
    <div className="flex w-full gap-2">
      <div className="w-8">
        <Typography variant="body2" className="text-center ">
          -
        </Typography>
      </div>
      <div>
        <Typography variant="body2" className="flex items-end text-gray-300">
          Plus {numberOfLeft} more balances
        </Typography>
      </div>
    </div>
  );
};

export default MoreSummary;
