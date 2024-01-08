import { Typography } from "@mui/material";
import { toAmountString, toShortName } from "../../utils/common";
import PersonalSummary, { Transaction } from "./PersonalSummary";
import MoreSummary from "./MoreSummary";

export interface PersonalDept {
  name: string;
  amount: number;
  type: Transaction;
}
interface Props {
  list: PersonalDept[];
}

const SummaryList = ({ list }: Props) => {
  const toDisplay = list.length > 3 ? list.slice(0, 2) : list;

  return (
    <div className="flex flex-col gap-1 mt-1">
      {toDisplay.map((item, index) => (
        <PersonalSummary
          key={item.name + index}
          {...item}
          name={toShortName(item.name)}
        />
      ))}
      {list.length > 3 && <MoreSummary numberOfLeft={list.length - 2} />}
    </div>
  );
};

export default SummaryList;
