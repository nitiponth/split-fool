import { ListItemButton, Avatar, ListItemText, Checkbox } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  userId: string;
  userName: string;
  profile?: string;
}

const Member = ({ name, userId, userName, profile }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const handlerSelect = () => {
          if (!field.value.includes(userId)) {
            const updatedValue = [...field.value, userId];
            return field.onChange(updatedValue);
          } else {
            const updatedValue = field.value.filter(
              (value: string) => value !== userId
            );
            return field.onChange(updatedValue);
          }
        };

        return (
          <ListItemButton
            className="flex flex-1"
            key={userId}
            onClick={handlerSelect}
          >
            <Avatar className="w-10 h-10 mr-3" src={profile} />
            <ListItemText primary={userName} />
            <Checkbox
              {...field}
              checked={field.value?.includes(userId)}
              disableRipple
              onChange={handlerSelect}
            />
          </ListItemButton>
        );
      }}
    />
  );
};

export default Member;
