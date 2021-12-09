import React, { FC, HTMLAttributes } from "react";
import { Spinner as ChakraSpinner, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Spinner: FC<SpinnerProps> = ({
  loadingText = "loading",
  ...props
}) => {
  return (
    <StyledSpinner {...props}>
      <ChakraSpinner color="purple.400" textAlign="center" />
      <Text textAlign="center">{loadingText}</Text>
    </StyledSpinner>
  );
};

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * loadingText - Text to show when component is loading
   */
  loadingText?: string;
}

const StyledSpinner = styled.div`
  text-align: center;
`;
