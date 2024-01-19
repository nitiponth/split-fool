import { Transition } from "@/app/components/commons/Transition";
import { Dialog, AppBar, Toolbar, Button, Typography } from "@mui/material";
import FormTextField from "@/app/components/inputs/FormTextField";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const AddNewContact = ({ open, handleClose, handleConfirm }: Props) => {
  const methods = useForm<{ name: string }>();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Typography
            className="flex flex-1 justify-center"
            variant="h6"
            component="div"
          >
            Add new contract
          </Typography>
          <Button autoFocus color="inherit" onClick={handleConfirm}>
            Next
          </Button>
        </Toolbar>
      </AppBar>

      <div className="flex flex-col px-4 py-6">
        <FormProvider {...methods}>
          <FormTextField name="name" label="Name" />
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default AddNewContact;
