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
import { useEffect, useState } from "react";
import PersonAddAlt1SharpIcon from "@mui/icons-material/PersonAddAlt1Sharp";
import { supabase } from "@/app/db/supabase-client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getFriends } from "../../queries/friends";

interface Props {
  open: boolean;
  handleClose: () => void;
}

interface Friend {
  id: string;
  name: string;
  profile?: string | null;
}

const AddGroupMemberList = ({ open, handleClose }: Props) => {
  const [openNewContactModal, setOpenNewContactModal] =
    useState<boolean>(false);

  const [friends, setFriends] = useState<Friend[]>([]);

  const { user } = useUser();
  const { id } = user ?? {};

  const initialize = async () => {
    if (!id) return;

    const { data } = await getFriends.eq("user_id", id);
    console.log("🚀 ~ initialize ~ data:", data);

    const friendList =
      data?.map(({ users }): Friend => {
        return {
          id: users!.id,
          name: users!.name,
          profile: users!.profile,
        };
      }) ?? [];

    setFriends(friendList);
  };

  useEffect(() => {
    try {
      initialize();
    } catch (error) {
      console.log("🚀 ~ useEffect ~ error:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const refreshAfterCreated = async () => {
    initialize();
    setOpenNewContactModal(false);
  };

  const FriendList = () => {
    if (!friends.length) return null;

    return friends.map((item) => {
      return (
        <>
          <Divider />
          <Member
            name={"selectedUserIds"}
            userId={item.id}
            userName={item.name}
          />
        </>
      );
    });
  };

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
          <FriendList />
        </List>
      </Dialog>

      <AddNewContact
        open={openNewContactModal}
        handleConfirm={refreshAfterCreated}
        handleClose={() => setOpenNewContactModal(false)}
      />
    </>
  );
};

export default AddGroupMemberList;
