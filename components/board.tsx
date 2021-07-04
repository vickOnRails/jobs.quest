import React, { FC, HTMLAttributes } from "react";
import { Box, Flex, Heading, useColorMode } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { IBoard } from "../pages/app";
import { BoardCard } from ".";
import { ApplicationStage, ConfidenceLevel } from "../types/types";

export interface Job {
  position: string;
  location: string;
  date: number;
  companyName: string;
  applicationStage: ApplicationStage;
  companySite?: string;
  confidenceLevel: ConfidenceLevel;
}

/**
 * Board component
 */
export const Board: FC<BoardProps> = ({ children, board, ...props }) => {
  const { colorMode } = useColorMode();

  const { title, jobs } = board;

  return (
    <StyledBoard bg={colorMode === "light" ? "gray.100" : "gray.900"}>
      <Heading as="h3">{title}</Heading>

      {jobs.map((job, idx) => (
        <BoardCard job={job} key={idx} />
      ))}
    </StyledBoard>
  );
};

interface BoardProps extends HTMLAttributes<HTMLElement> {
  board: IBoard;
}

const StyledBoard = styled(Box)`
  margin-right: 1em;
  min-width: 18rem;
  padding: 1em 0.7em;
  border-radius: var(--br-lg);

  h3 {
    font-size: 1rem;
    margin-bottom: 1em;
  }
`;
