import React from "react";
import styled from "@emotion/styled";
import { Flex, Button, Link, Spacer, useColorMode } from "@chakra-ui/react";
import { GitHub, MoreVertical, Moon, Sun } from "react-feather";
import Image from "next/image";
import { signOut } from "next-auth/client";
import NextLink from "next/link";

import { Container } from "../components";
import { breakpoints } from "../theme";

/**
 * Navigation component
 */

export const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <StyledNav>
      <Flex as={Container} fullWidth>
        <NextLink href="/app">
          {/* If I make this an SVG, I could control the hover state */}
          <Link>
            <Image src="/Logo.svg" height="40" width="40" />
          </Link>
        </NextLink>

        <Spacer />

        <Button
          as={Link}
          href="https://github.com/vickOnRails/jobs.quest"
          target="_blank"
          rel="noreferrer noopener"
          variant="outline"
        >
          <GitHub />
        </Button>
        <Button variant="outline" className="hide-desktop">
          <MoreVertical />
        </Button>

        <Button onClick={toggleColorMode} variant="outline">
          {colorMode === "light" ? <Moon /> : <Sun />}
        </Button>

        <Button
          color="#805AD5"
          variant="outline"
          onClick={() => signOut()}
          //   className="hide-mobile"
        >
          Log Out
        </Button>
      </Flex>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);

  .hide-mobile {
    display: none;
  }

  .chakra-button {
    margin-right: 0.5em;
  }

  @media screen and (min-width: ${breakpoints.sm}) {
    .hide-desktop {
      display: none;
    }
    .hide-mobile {
      display: block;
    }
  }
`;
