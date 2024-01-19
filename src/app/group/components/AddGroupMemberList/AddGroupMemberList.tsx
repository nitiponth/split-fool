import { Transition } from "@/app/components/commons/Transition";
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  Divider,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Member from "./Member";
import AddNewContact from "../AddNewContact.tsx/AddNewContact";
import { useState } from "react";
import PersonAddAlt1SharpIcon from "@mui/icons-material/PersonAddAlt1Sharp";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddGroupMemberList = ({ open, handleClose }: Props) => {
  const [openNewContactModal, setOpenNewContactModal] =
    useState<boolean>(false);

  return (
    <>
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
              Add Group Members
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Next
            </Button>
          </Toolbar>
        </AppBar>

        <List>
          <ListItemButton
            className="flex flex-1"
            onClick={() => setOpenNewContactModal(true)}
          >
            <div className="w-10 h-10 flex justify-center items-center mr-3">
              <PersonAddAlt1SharpIcon />
            </div>
            <ListItemText primary={"Add a new contract to SplitFool"} />
          </ListItemButton>
          <Divider />
          <Member name={"selectedUserIds"} userId={"1"} userName={"test 1"} />
          <Divider />
          <Member name={"selectedUserIds"} userId={"2"} userName={"test 2"} />
          <Divider />
          <Member name={"selectedUserIds"} userId={"3"} userName={"test 3"} />
          <Divider />
          <Member name={"selectedUserIds"} userId={"4"} userName={"test 4"} />
        </List>
      </Dialog>

      <AddNewContact
        open={openNewContactModal}
        handleConfirm={() => setOpenNewContactModal(false)}
        handleClose={() => setOpenNewContactModal(false)}
      />
    </>
  );
};

export default AddGroupMemberList;
