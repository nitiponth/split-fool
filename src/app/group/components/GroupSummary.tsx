import { Typography } from "@mui/material";
import { toAmountString } from "../../utils/common";
import SummaryList, { PersonalDept } from "./SummaryList";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ListImage from "@/public/gradientify/list.png";

interface Member {
  user_id: string;
  name: string;
}
interface Props {
  groupId: number;
  name: string;
  profile?: string;
  members: Member[];
}

const GroupSummary = ({ groupId, name, members, profile }: Props) => {
  const router = useRouter();

  const memberList = members.map(
    (memb): PersonalDept => ({
      name: memb.name,
      amount: 123.23,
      type: "borrowed",
    })
  );

  const navigationHandler = () => {
    router.push(`/group/${groupId}`);
  };

  return (
    <div
      className="flex flex-col p-4 bg-white/5 rounded"
      onClick={navigationHandler}
    >
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-white rounded flex-shrink">
          {/* TODO: show display group from uploaded image */}
          <Image
            src={profile ?? ListImage}
            alt="list"
            width={32}
            height={32}
            className="p-1"
          />
        </div>

        <div className="flex flex-1 w-full overflow-hidden">
          {/* FIXME: something went wrong with ellipsis */}
          <Typography variant="body2" className="text-ellipsis">
            {name}
          </Typography>
        </div>

        <div className="flex flex-col self-end">
          <Typography variant="subtitle2" className="text-end">
            you are owned
          </Typography>
          <Typography variant="subtitle2" className="text-end">
            {toAmountString(994.45)}
          </Typography>
        </div>
      </div>

      <SummaryList
        list={memberList}
        // list={[
        //   { name: "Thanakrit Jung", amount: 123.33, type: "borrowed" },
        //   { name: "Sarawut Pud", amount: 123.33, type: "owed" },
        //   { name: "Nitipon Thoop", amount: 123.33, type: "owed" },
        //   { name: "Tester Test", amount: 123.33, type: "owed" },
        // ]}
      />
    </div>
  );
};

export default GroupSummary;
