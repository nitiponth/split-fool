"use client";
import Summary from "../components/Summary";
import Layout from "../components/Layout";
import Header from "../components/Header";
import GroupSummary from "./components/GroupSummary";
import useSupabase from "../hooks/useSupabase";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import {
  GroupListWithMembers,
  groupListWithMembers,
} from "./queries/groupListWithMembers";

const Group = () => {
  const { user } = useUser();
  const supabase = useSupabase();

  const [groupList, setGroupList] = useState<GroupListWithMembers>([]);

  const initialize = async () => {
    try {
      if (!user) return;
      const { data: members } = await supabase
        .from("member")
        .select("group_id")
        .eq("user_id", user.sub!);

      const groupIds = members?.map((item) => item.group_id) ?? [];
      const { data } = await groupListWithMembers.in("id", groupIds);

      if (data?.length) {
        setGroupList(data);
      }
    } catch (error) {
      setGroupList([]);
      console.log("🚀 ~ file: page.tsx:24 ~ initialize ~ error:", error);
    }
  };

  useEffect(() => {
    initialize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <Header />
      <Summary />

      <div className="flex flex-col w-full gap-2">
        {groupList.map((group) => {
          const members = group.member.map((memb) => ({
            name: memb.user?.name ?? "",
            user_id: memb.user?.user_id ?? "",
          }));

          return (
            <GroupSummary
              groupId={group.id}
              key={group.id}
              name={group.name}
              profile={group.profile_url ?? undefined}
              members={members}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Group;
