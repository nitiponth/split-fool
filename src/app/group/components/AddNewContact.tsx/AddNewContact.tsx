import { Transition } from "@/app/components/commons/Transition";
import { Dialog, AppBar, Toolbar, Button, Typography } from "@mui/material";
import FormTextField from "@/app/components/inputs/FormTextField";
import { FormProvider, useForm } from "react-hook-form";
import PhoneNumberField from "@/app/components/inputs/PhoneNumberField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/app/db/supabase-client";
import { useUser } from "@auth0/nextjs-auth0/client";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const schema = z
  .object({
    name: z.string(),
    email: z.string().email().or(z.string().max(0)).optional(),
    phone: z.string().optional(),
  })
  .refine(({ email, phone }) => email || phone, {
    path: ["email"],
    message: "Email or Phone must be filled in",
  })
  .refine(({ email, phone }) => email || phone, {
    path: ["phone"],
    message: "Email or Phone must be filled in",
  })
  .transform((arg) => {
    return { ...arg, phone: arg.phone?.replaceAll("-", "") };
  });

type TCreateNewContact = z.infer<typeof schema>;

const AddNewContact = ({ open, handleClose, handleConfirm }: Props) => {
  const { user } = useUser();

  const methods = useForm<TCreateNewContact>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
  });

  const { handleSubmit, reset } = methods;

  const createNewContact = async ({
    name,
    phone,
    email,
  }: TCreateNewContact) => {
    const { data } = await supabase
      .from("users")
      .insert({
        name,
        email,
        phone,
      })
      .select("id");

    await supabase.from("friend").insert({
      user_id: user?.id! as string,
      friend_id: data?.[0].id as string,
    });
  };

  const onConfirm = async (data: TCreateNewContact) => {
    try {
      await createNewContact(data);
      handleConfirm();
      reset();
    } catch (error) {
      console.log("🚀 ~ onConfirm ~ error:", error);
    }
  };

  const onCancel = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onCancel}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Button autoFocus color="inherit" onClick={onCancel}>
            Cancel
          </Button>
          <Typography
            className="flex flex-1 justify-center"
            variant="h6"
            component="div"
          >
            Add new contract
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={handleSubmit(onConfirm)}
            type="submit"
          >
            Next
          </Button>
        </Toolbar>
      </AppBar>

      <div className="flex flex-col px-4 py-6 gap-4">
        <FormProvider {...methods}>
          <FormTextField name="name" label="Name" />
          <FormTextField name="email" label="Email (optional)" />
          <PhoneNumberField name="phone" label="Phone (optional)" />
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default AddNewContact;
