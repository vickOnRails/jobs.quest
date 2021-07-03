import React, { FC, HTMLAttributes } from "react";
import { Box, useColorMode, Heading, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Map, Clock } from "react-feather";

import { Job } from "./board";

export const BoardCard: FC<BoardCardProps> = ({ job }) => {
  const { colorMode } = useColorMode();
  const { position, location, date, companyName } = job;

  return (
    <StyledBoardCard
      bgColor={colorMode === "light" ? "white" : "gray.800"}
      boxShadow={
        colorMode === "light" ? "0 0 5px 2px rgba(0,0,0,0.06)" : "none"
      }
    >
      <Heading as="h4">{job.position}</Heading>

      <Flex wrap="wrap" justifyContent="space-between">
        <Flex className="location" alignItems="center">
          <Map className="icon" />
          <span>{location}</span>
        </Flex>
        <Flex alignItems="center">
          <Clock className="icon" />
          <span>{date}</span>
        </Flex>
        <Flex alignItems="center">
          <Map className="icon" />
          <span>{companyName}</span>
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
  border-radius: var(--br-lg);

  .icon {
    height: 1em;
    width: 1em;
    margin-right: 0.35em;
  }
  .location {
    flex: 1 100%;
  }
  h4 {
    font-size: 1rem;
  }
`;
