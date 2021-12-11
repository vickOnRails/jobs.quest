import React, { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";
import {
  DragDropContext,
  DropResult,
  resetServerContext,
  ResponderProvided,
} from "react-beautiful-dnd";

import { Board, Spinner } from ".";
import { IBoard } from "../pages/app";
import { useMutation } from "react-query";
import { Job } from "./board";
import { ApplicationStage } from "../types/types";
import { editJob } from "../utils/services/edit-job";
import { Box, useColorMode, useToast } from "@chakra-ui/react";

/**
 * Board component
 */

export const Boards: FC<BoardsProps> = ({ boards, refetch }) => {
  const toast = useToast();
  const { colorMode } = useColorMode();

  // mutation for changing the job application stage
  const { mutate: moveJobStageMutation, isLoading } = useMutation(
    async ({ id, applicationStage }: Pick<Job, "id" | "applicationStage">) => {
      toast({
        title: `Updating...`,
        status: "info",
      });

      // run the editJob service
      await editJob({ applicationStage: applicationStage }, id);

      // close loading state toasts
      toast.closeAll();

      // reset entire board state
      await refetch();

      toast({
        title: `Job Updated`,
        description: `Job has been moved to the ${applicationStage} stage`,
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  );

  // This is a function to fix serverside rendering bug in react-beautiful-dnd
  resetServerContext();

  // function to run after the onDrag event
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { draggableId, destination, source } = result;

    // If we move outside the box, run the edit mutation
    if (destination?.droppableId !== source.droppableId) {
      let count = 0;
      let storedCount: any;
      let tempJob: any;

      // For each board
      for (let board of boards) {
        Array.from(board.jobs).map((job) => {
          // If we ever find the job we are dragging
          if (job.id === draggableId) {
            // delete it and re-add it to the new board
            tempJob = job;
            storedCount = count;
            board.jobs.delete(job);
          }
        });

        count++;
      }

      boards[storedCount].jobs.add(tempJob);

      // run mutation
      moveJobStageMutation({
        id: draggableId,
        applicationStage:
          destination?.droppableId.toUpperCase() as ApplicationStage,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledBoard className="custom-scrollbar">
        {isLoading ? (
          <Box
            className="loading"
            bg={colorMode === "light" ? "gray.50" : "gray.900"}
          >
            <Spinner loadingText="Updating..." className="spinner" />
          </Box>
        ) : (
          boards.map((board: any) => {
            return (
              <Board
                board={board}
                className="custom-scrollbar"
                key={board.name}
              />
            );
          })
        )}
      </StyledBoard>
    </DragDropContext>
  );
};

interface BoardsProps extends HTMLAttributes<HTMLElement> {
  boards: IBoard[];
  refetch: () => void;
}

const StyledBoard = styled.section`
  .loading {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;

    .spinner {
      margin: auto;
    }
  }

  display: flex;
  align-items: stretch;
  position: relative;
  // max-height: 100vh;
  // min-height: 60vh;
  height: 80vh;
  overflow-x: auto;
`;
