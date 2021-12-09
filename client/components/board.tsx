import React, { FC, HTMLAttributes } from "react";
import { Box, Heading, useColorMode } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { IBoard } from "../pages/app";
import { BoardCard } from ".";
import { ApplicationStage, ConfidenceLevel } from "../types/types";
import { Droppable, Draggable } from "react-beautiful-dnd";

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

export const Board: FC<BoardProps> = ({ board, className, ...props }) => {
  const { colorMode } = useColorMode();

  // @ts-ignore
  const { title, jobs } = board;
  const jobsArray = Array.from(jobs);

  return (
    <StyledBoard
      bg={colorMode === "light" ? "gray.100" : "gray.900"}
      className={className}
    >
      <Heading as="h3">
        {title} <small>{jobs.size}</small>
      </Heading>

      <Droppable droppableId={title}>
        {(provided) => (
          <section
            style={{
              minHeight: "80%",
            }}
            {...props}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {jobsArray.map((job: any, idx: any) => (
              <Draggable key={job._id} draggableId={job._id} index={idx + 1}>
                {(provided) => (
                  <BoardCard
                    job={job}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    innerRef={provided.innerRef}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </StyledBoard>
  );
};

interface BoardProps extends HTMLAttributes<HTMLDivElement> {
  board: IBoard;
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
