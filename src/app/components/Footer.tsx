import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Typography, Avatar } from "@mui/material";

const Footer = () => {
  return (
    <div className="sticky bottom-0 w-full h-16 bg-white flex justify-evenly">
      <div className="flex flex-col items-center justify-center !w-16">
        <Person2OutlinedIcon width={32} height={32} className="text-gray-500" />
        <Typography variant="caption" className="text-gray-500">
          Friends
        </Typography>
      </div>
      <div className="flex flex-col items-center justify-center !w-16">
        <PeopleAltOutlinedIcon
          width={32}
          height={32}
          className="text-gray-500"
        />
        <Typography variant="caption" className="text-gray-500">
          Group
        </Typography>
      </div>
      <div className="flex flex-col items-center justify-center !w-16">
        <AddOutlinedIcon width={40} height={40} className="text-gray-500" />
      </div>
      <div className="flex flex-col items-center justify-center !w-16">
        <NotificationsOutlinedIcon
          width={32}
          height={32}
          className="text-gray-500"
        />
        <Typography variant="caption" className="text-gray-500">
          Activity
        </Typography>
      </div>
      <div className="flex flex-col items-center justify-center !w-16">
        <Avatar sx={{ width: 28, height: 28 }} />
        <Typography variant="caption" className="text-gray-500">
          Account
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
