import React, { FC, HTMLAttributes } from "react";
import { Box, Heading, useColorMode } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { IBoard } from "../pages/app";
import { BoardCard } from ".";
import { ApplicationStage, ConfidenceLevel } from "../types/types";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface Note {
  id: string;
  body: string;
  jobId?: string;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Job {
  id: string;
  title: string;
  jobLocation: string;
  createdAt: number;
  companyName: string;
  applicationStage: ApplicationStage;
  companyWebsite?: string;
  confidenceLevel: ConfidenceLevel;
  link: string;
  updatedAt: string;
  notes?: Note[];
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
              <Draggable key={job.id} draggableId={job.id} index={idx + 1}>
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
