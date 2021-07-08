import React from "react";
import { Spinner as ChakraSpinner, Box, Text } from "@chakra-ui/react";

export const Spinner = () => {
  return (
    <Box textAlign="center">
      <ChakraSpinner color="purple.400" />
      <Text>Loading...</Text>
    </Box>
  );
};
