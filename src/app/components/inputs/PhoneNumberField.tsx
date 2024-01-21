import React from "react";
import { IMaskInput } from "react-imask";
import { Controller, useFormContext } from "react-hook-form";
import {
  Input,
  InputLabel,
  InputProps,
  TextField,
  TextFieldProps,
} from "@mui/material";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000-000-0000"
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
      />
    );
  }
);

type Props = TextFieldProps & {
  name: string;
};

const PhoneNumberField = ({ name, ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, ...rest },
        fieldState: { invalid, error },
      }) => {
        return (
          <TextField
            {...props}
            {...rest}
            onChange={(e) => onChange(e.target.value)}
            name={name}
            error={invalid}
            id="formatted-text-mask-input"
            variant="filled"
            helperText={error?.message}
            InputProps={{
              inputComponent: TextMaskCustom as any,
            }}
          />
        );
      }}
    />
  );
};

export default PhoneNumberField;
