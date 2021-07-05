import React, { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";

import { Board } from ".";
import { IBoard } from "../pages/app";

/**
 * Board component
 */
export const Boards: FC<BoardsProps> = ({ boards }) => {
  return (
    <StyledBoard>
      {boards.map((board) => (
        <Board key={board.name} board={board} />
      ))}
    </StyledBoard>
  );
};

interface BoardsProps extends HTMLAttributes<HTMLElement> {
  boards: IBoard[];
}

const StyledBoard = styled.section`
  display: flex;
  align-items: flex-start;
  max-height: 100vh;
  min-height: 60vh;
  overflow-x: auto;
`;
