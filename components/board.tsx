import React, { FC, HTMLAttributes, ReactElement } from "react";
import { Box, Flex, Heading, useColorMode } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { IBoard } from "../pages/app";
import { BoardCard } from ".";
import { ApplicationStage, ConfidenceLevel } from "../types/types";

export interface Job {
  _id: string;
  position: string;
  location: string;
  date: number;
  companyName: string;
  applicationStage: ApplicationStage;
  companySite?: string;
  confidenceLevel: ConfidenceLevel;
  jobLink: string;
  updatedAt: string;
}

/**
 * Board component
 */
// export const Board: FC<BoardProps> = ({ children, board, ...props }) => {
// @ts-ignore
export const Board: FC<BoardProps> = ({ board, innerRef, ...props }) => {
  const { colorMode } = useColorMode();

  // @ts-ignore
  const { title, jobs } = board;
  const jobsArray = Array.from(jobs);

  return (
    <StyledBoard
      bg={colorMode === "light" ? "gray.100" : "gray.900"}
      {...props}
      ref={innerRef}
    >
      <Heading as="h3">
        {title} <small>{jobs.size}</small>
      </Heading>

      {jobsArray.map((job: any, idx: any) => (
        <BoardCard job={job} key={idx} />
      ))}
    </StyledBoard>
  );
};

interface BoardProps extends HTMLAttributes<HTMLDivElement> {
  board: IBoard;
  innerRef: (ref: any) => void;
}

const StyledBoard = styled(Box)`
  margin-right: 1em;
  min-width: 18rem;
  height: auto;
  max-height: 100vh;
  padding: 1em 0.7em;
  border-radius: var(--br-lg);
  overflow-y: auto;
  margin-bottom: 0.5em;

  h3 {
    font-size: 1rem;
    margin-bottom: 1em;
  }
`;
