import React, { FC, HTMLAttributes } from "react";
import { Box, useColorMode, Heading, Text, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { Map, Clock } from "react-feather";

import { Job } from "./board";
import { formatDate } from "../utils";

export const BoardCard: FC<BoardCardProps> = ({ job }) => {
  const { colorMode } = useColorMode();
  const { position, location, companySite, date, companyName } = job;

  const textColorDim = colorMode === "light" ? "gray.600" : "gray.500";

  return (
    <StyledBoardCard
      bgColor={colorMode === "light" ? "white" : "gray.800"}
      boxShadow={
        colorMode === "light" ? "0 0 5px 2px rgba(0,0,0,0.06)" : "none"
      }
    >
      <Heading as="h4">{position}</Heading>

      <Flex wrap="wrap" justifyContent="space-between">
        <Flex className="location" alignItems="center">
          <Map className="icon" />
          <Text className="mb-0" color={textColorDim} fontSize="md">
            {location}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Clock className="icon" />
          <Text className="mb-0" color={textColorDim} fontSize="sm">
            {formatDate(date)}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Image
            src={`https://logo.clearbit.com/${companySite}`}
            height="20"
            className="logo-img"
            width="20"
          />
          <Text className="company-name" color={textColorDim} fontSize="sm">
            {companyName}
          </Text>
        </Flex>
      </Flex>
    </StyledBoardCard>
  );
};

interface BoardCardProps extends HTMLAttributes<HTMLElement> {
  job: Job;
}

const StyledBoardCard = styled(Box)`
  padding: 1em 0.7em;
  margin-bottom: 1em;
  border-radius: var(--br-lg);

  .icon {
    height: 1em;
    width: 1em;
    margin-right: 0.35em;
    color: var(--chakra-colors-gray-500);
  }
  .location {
    flex: 1 100%;
  }
  h4 {
    font-size: 1rem;
  }
  .logo-img {
    border-radius: 1000px;
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .company-name {
    margin: 0;
    margin-left: 0.15em;
  }
`;
