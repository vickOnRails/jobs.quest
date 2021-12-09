import React, { FC, HTMLAttributes } from "react";
import {
  Avatar,
  Heading,
  Flex,
  Spacer,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

import { Container } from ".";
import { DefaultUser } from "next-auth";
import { breakpoints } from "../theme";

/**
 *  Header component
 */
export const Header: FC<HeaderProps> = ({ user }) => {
  const { colorMode } = useColorMode();
  const { image, name } = user;

  return (
    <StyledHeader
      className="header"
      as="header"
      bg={colorMode === "dark" ? "gray.900" : "gray.100"}
    >
      <Flex as={Container} alignItems="center" fullWidth>
        {image && <Avatar src={image} className="header__avatar" />}

        <Heading as="h1">{name}</Heading>

        {colorMode === "light" && <div className="header__illustration" />}
      </Flex>
    </StyledHeader>
  );
};

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * user - user from NextAuth return object
   */
  user: DefaultUser;
}

const StyledHeader = styled(Box)`
  min-height: 8em;
  display: flex;
  margin-bottom: 1em;

  .container {
    position: relative;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .header__avatar {
    margin-right: 0.8rem;
    height: 60px;
    width: 60px;
  }
  .header__illustration {
    background: url(/header-illustration.png) no-repeat;
    background-size: contain;
    background-position: center;
    width: 150px;
    height: 100%;
    max-height: 8em;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }

  @media screen and (min-width: ${breakpoints.sm}) {
    min-height: 11em;

    .header__avatar {
      height: 80px;
      width: 80px;
    }
    h1 {
      margin: 0;
      font-size: var(--chakra-fontSizes-3xl);
    }
    .header__illustration {
      max-height: 11em;
      right: 3%;
    }
  }
`;
