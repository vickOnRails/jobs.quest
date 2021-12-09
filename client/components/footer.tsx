import React from "react";
import { Link, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <footer>
      <Text textAlign="center" color="purple.400">
        <Link
          href="https://github.com/vickOnRails/jobs.quest"
          rel="noreferrer noopener"
          target="_blank"
        >
          Checkout our Github
        </Link>{" "}
        |{" "}
        <Link
          href="https://twitter.com/vick_OnRails"
          rel="noreferrer noopener"
          target="_blank"
        >
          vick_onrails
        </Link>
      </Text>
    </footer>
  );
};
