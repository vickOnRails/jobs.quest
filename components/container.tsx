import React, { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { breakpoints } from "../theme";

const Container: FC<ContainerProps> = ({ children, ...props }) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};

interface ContainerProps extends HTMLAttributes<HTMLElement> {}

const StyledContainer = styled.section`
  padding-left: 3%;
  padding-right: 3%;
  max-width: 35em;
  margin: 0 auto;

  @media (min-width: ${breakpoints.sm}) {
    max-width: 80em;
  }
`;

export { Container };
