"use client";
import Summary from "../components/Summary";
import Layout from "../components/Layout";
import Header from "../components/Header";
import GroupSummary from "./components/GroupSummary";

const Group = () => {
  return (
    <Layout>
      <Header />
      <Summary />

      <div className="flex flex-col w-full gap-2">
        <GroupSummary />
        <GroupSummary />
        <GroupSummary />
        <GroupSummary />
        <GroupSummary />
        <GroupSummary />
      </div>
    </Layout>
  );
};

export default Group;
