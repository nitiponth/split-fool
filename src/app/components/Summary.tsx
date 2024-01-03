import { Typography } from "@mui/material";

const Summary = () => {
  return (
    <div className="py-4">
      <Typography>
        Overall you are owned{" "}
        {(3400.67).toLocaleString("en-US", {
          style: "currency",
          currency: "THB",
        })}
      </Typography>
    </div>
  );
};

export default Summary;
