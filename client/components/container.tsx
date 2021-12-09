import React, { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { breakpoints } from "../theme";

// Container component to wrap all the components in the app
const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  const _className = className ? `container ${className}` : `container`;
  return (
    <StyledContainer {...props} className={_className}>
      {children}
    </StyledContainer>
  );
};

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /**
   * fullWidth - when set to true, the container will take up the full width of the screen
   */
  fullWidth?: boolean;
}

const StyledContainer = styled.section<ContainerProps>`
  padding-left: 3%;
  padding-right: 3%;
  max-width: 80em;
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${breakpoints.sm}) {
    max-width: ${({ fullWidth }) => (fullWidth ? `80em` : `62em`)};
  }
`;

Container.defaultProps = {
  fullWidth: false,
};

export { Container };
