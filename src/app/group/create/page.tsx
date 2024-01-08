"use client";
import Layout from "@/app/components/Layout";
import { Button, Typography } from "@mui/material";
import Image from "next/image";

import GroupImage from "@/public/gradientify/photo_camera.png";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextField from "@/app/components/inputs/FormTextField";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSupabase } from "@/app/db/supabase-client";

const schema = z.object({
  name: z
    .string({ required_error: "This is required field" })
    .min(1, "This is required field"),
  profile: z.string().optional(),
});

type TSchema = z.infer<typeof schema>;

const CreateGroup = () => {
  const { user } = useUser();
  const router = useRouter();
  const methods = useForm<TSchema>({
    resolver: zodResolver(schema),
  });

  const supabase = getSupabase(user?.accessToken as string | undefined);

  const { handleSubmit } = methods;

  const createGroupHandler = async ({ name, profile }: TSchema) => {
    try {
      const { data } = await supabase
        .from("group")
        .insert({
          name,
          profile_url: profile,
          created_by: user?.sub ?? "FIXME",
        })
        .select("*");

      const groupId = data?.[0].id;

      await supabase.from("member").insert({
        user_id: user?.sub!,
        group_id: groupId,
      });

      router.replace(`/group/${groupId}`);
    } catch (error) {
      console.log(
        "🚀 ~ file: page.tsx:53 ~ createGroupHandler ~ error:",
        error
      );
    }
  };

  const onCancelHandler = () => {
    router.back();
  };

  return (
    <Layout>
      <FormProvider {...methods}>
        <div className="flex justify-between items-center mb-8">
          <Button variant="text">
            <Typography
              variant="button"
              onClick={onCancelHandler}
              className="text-green-300"
            >
              Cancel
            </Typography>
          </Button>
          <Typography className="text-lg">Create a group</Typography>
          <Button
            variant="text"
            type="submit"
            onClick={handleSubmit(createGroupHandler)}
          >
            <Typography variant="button" className="text-green-300">
              Done
            </Typography>
          </Button>
        </div>

        <div className="flex flex-1 gap-4">
          <div className="w-14 h-14 p-2 bg-white rounded">
            <Image
              src={GroupImage}
              alt="group's profile"
              className="w-full h-full"
            />
          </div>
          <FormTextField
            name="name"
            className="flex flex-1"
            label="Group name"
          />
        </div>
      </FormProvider>
    </Layout>
  );
};

export default CreateGroup;
