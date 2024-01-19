"use client";
import Layout from "@/app/components/Layout";
import { supabase } from "@/app/db/supabase-client";
import { Group } from "@/app/interfaces/group";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button, ThemeProvider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddGroupMemberList from "../components/AddGroupMemberList/AddGroupMemberList";
import { FormProvider, useForm } from "react-hook-form";

const GroupDetail = ({ params }: { params: { groupId: string } }) => {
  const [groupDetail, setGroupDetail] = useState<Group>();

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { groupId } = params;

  const router = useRouter();

  const initialize = async () => {
    try {
      if (!groupId) return;
      const { data } = await supabase.from("group").select().eq("id", groupId);
      if (!data?.length) return;

      setGroupDetail(data[0]);
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:25 ~ initialize ~ error:", error);
    }
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const methods = useForm<{ selectedUserIds: string[] }>({
    defaultValues: {
      selectedUserIds: [],
    },
  });
  const { watch } = methods;

  const a = watch("selectedUserIds");
  console.log("🚀 ~ GroupDetail ~ a:", a);

  return (
    <Layout className="!p-0 bg-slate-800 relative flex flex-col">
      <div className="flex justify-between bg-slate-950 p-4 pt-10 py-20 t-0 w-full">
        <ArrowBackIosIcon sx={{ fontSize: "20px" }} onClick={router.back} />
        <SettingsOutlinedIcon sx={{ fontSize: "20px" }} />
      </div>

      <div className="relative">
        <div className="w-28 h-28 bg-white absolute -top-11 left-8 rounded-xl overflow-hidden ">
          <div className="flex flex-1 w-full h-full bg-green-100 border-solid border-[6px] rounded-xl border-white box-border"></div>
        </div>
      </div>

      <div className="px-8 mt-[88px]">
        <Typography className="text-2xl font-semibold">
          {groupDetail?.name}
        </Typography>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 h-full flex-col items-center pt-20 gap-8">
          <Typography>{"You're the only one here!"}</Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<GroupAddIcon />}
            className="text-white"
            onClick={handleClickOpen}
          >
            Add members
          </Button>
        </div>
      </div>

      <FormProvider {...methods}>
        <AddGroupMemberList open={open} handleClose={handleClose} />
      </FormProvider>
    </Layout>
  );
};

export default GroupDetail;
