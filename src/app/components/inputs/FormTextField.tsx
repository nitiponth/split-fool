import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps;

const FormTextField = (props: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="name"
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, error },
      }) => (
        <TextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          ref={ref}
          variant="filled"
          error={invalid}
          helperText={error?.message}
          {...props}
        />
      )}
    />
  );
};

export default FormTextField;
