import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const onCreateGroupHandler = () => {
    router.push("/group/create");
  };

  return (
    <div className="flex flex-1 justify-between">
      <SearchIcon />
      <Button variant="text" onClick={onCreateGroupHandler}>
        Create group
      </Button>
    </div>
  );
};

export default Header;
