import React, { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { Board } from ".";
import { IBoard } from "../pages/app";

/**
 * Board component
 */
export const Boards: FC<BoardsProps> = ({ boards }) => {
  return (
    <Droppable droppableId="jobs">
      {(provided) => (
        <div
          className="custom-scrollbar"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {boards.map((board, index) => {
            console.log(index + 1);
            return (
              <Draggable
                key={board.name}
                draggableId={board.name}
                index={index + 1}
              >
                {(provided) => (
                  <div
                    // board={board}
                    className="custom-scrollbar"
                    key={board.name}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    Hello World
                  </div>
                )}
              </Draggable>
            );
          })}
        </div>
      )}
    </Droppable>
  );
};

interface BoardsProps extends HTMLAttributes<HTMLElement> {
  boards: IBoard[];
}

const StyledBoard = styled.section`
  display: flex;
  align-items: stretch;
  max-height: 100vh;
  min-height: 60vh;
  overflow-x: auto;
`;
