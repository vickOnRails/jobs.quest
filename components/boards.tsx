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
  min-height: 100vh;
  overflow-x: scroll;
`;
