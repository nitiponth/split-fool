"use client";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Typography, Avatar } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const Footer = () => {
  const { user } = useUser();

  return (
    <div className="sticky bottom-0 w-full h-16 bg-white flex justify-evenly">
      <div className="flex flex-col items-center justify-center !w-16">
        <Person2OutlinedIcon className="text-gray-500" />
        <Typography variant="caption" className="text-gray-500">
          Friends
        </Typography>
      </div>
      <Link
        href={"/group"}
        className="flex flex-col items-center justify-center !w-16 no-underline"
      >
        <PeopleAltOutlinedIcon className="text-gray-500 " />
        <Typography variant="caption" className="text-gray-500">
          Group
        </Typography>
      </Link>
      <div className="flex flex-col items-center justify-center !w-16">
        <AddOutlinedIcon sx={{ fontSize: "24px" }} className="text-gray-500 " />
      </div>
      <div className="flex flex-col items-center justify-center !w-16">
        <NotificationsOutlinedIcon className="text-gray-500 " />
        <Typography variant="caption" className="text-gray-500">
          Activity
        </Typography>
      </div>
      <a
        className="flex flex-col items-center justify-center !w-16 no-underline text-gray-500"
        href="/api/auth/logout"
      >
        <Avatar
          sx={{ width: 24, height: 24 }}
          src={user?.picture ?? undefined}
        />
        <Typography variant="caption" className="text-gray-500">
          Account
        </Typography>
      </a>
    </div>
  );
};

export default Footer;
