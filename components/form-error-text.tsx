import React, { FC } from "react";
import { FormHelperText, HelpTextProps } from "@chakra-ui/react";

// FormErrorText component renders error text at the bottom of invalidated input fields.
export const FormErrorText: FC<FormErrorTextProps> = ({
  children,
  ...props
}) => {
  return (
    <FormHelperText
      color="red.500"
      bg="red.50"
      p={2}
      borderRadius="4"
      {...props}
    >
      {children}
    </FormHelperText>
  );
};

interface FormErrorTextProps extends HelpTextProps {}
