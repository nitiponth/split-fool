"use client";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, Typography } from "@mui/material";
import GroupSummary from "./components/GroupSummary";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const onCreateGroupHandler = () => {
    router.push("/group/create");
  };

  return (
    <>
      <div className="px-4 py-8 w-full">
        <div className="flex flex-1 justify-between">
          <SearchIcon />
          <Button variant="text" onClick={onCreateGroupHandler}>
            Create group
          </Button>
        </div>

        <div className="py-4">
          <Typography>
            Overall you are owned{" "}
            {(3400.67).toLocaleString("en-US", {
              style: "currency",
              currency: "THB",
            })}
          </Typography>
        </div>

        <div className="flex flex-col w-full gap-2">
          <GroupSummary />
          <GroupSummary />
          <GroupSummary />
          <GroupSummary />
          <GroupSummary />
          <GroupSummary />
        </div>
      </div>
    </>
  );
};

export default Home;
