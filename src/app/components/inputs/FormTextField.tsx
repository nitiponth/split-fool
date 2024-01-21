import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
};

const FormTextField = (props: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, error },
      }) => (
        <TextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
          error={invalid}
          helperText={error?.message}
          {...props}
          name={name}
          variant="filled"
        />
      )}
    />
  );
};

export default FormTextField;
