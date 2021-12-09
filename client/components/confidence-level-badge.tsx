import React, { FC } from "react";
import styled from "@emotion/styled";
import { ConfidenceLevel } from "../types/types";

const generateClassName = (confidenceLevel: ConfidenceLevel) => {
  return confidenceLevel.toLowerCase().replaceAll(" ", "-");
};

const appendConfidenceLevelEmoji = (confidenceLevel: ConfidenceLevel) => {
  switch (confidenceLevel) {
    case ConfidenceLevel.CONFIDENT:
      return "⭐";

    case ConfidenceLevel.HIGHLY_CONFIDENT:
      return "✨";

    case ConfidenceLevel.FAIR_ATTEMPT:
      return "🏌🏼‍♂️";

    case ConfidenceLevel.FAIRLY_CONFIDENT:
      return "🚀";

    case ConfidenceLevel.OPTIMISTIC:
      return "🤲🏼";
    default:
      return null;
  }
};

export const ConfidenceLevelBadge: FC<ConfidenceLevelBadgeProps> = ({
  confidenceLevel,
}) => {
  return (
    <StyledConfidenceLevelBadge className={generateClassName(confidenceLevel)}>
      {confidenceLevel} {appendConfidenceLevelEmoji(confidenceLevel)}
    </StyledConfidenceLevelBadge>
  );
};

interface ConfidenceLevelBadgeProps {
  confidenceLevel: ConfidenceLevel;
}

const StyledConfidenceLevelBadge = styled.span`
  display: block;
  margin-bottom: 0.6em;
  border-radius: var(--br-xl);
  padding: 0.2em 0.5em;
  font-size: 0.8em;
  font-weight: bold;

  --text-color: #34a853;
  --background-color: #dcffe5;
  --border-color: #76f598;

  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);

  &.fair-attempt {
    --background-color: #ffdfcf;
    --text-color: #ff5500;
    --border-color: #ffbf9f;
  }
  &.optimistic {
    --background-color: #fffbeb;
    --text-color: #ffcb13;
    --border-color: #ffcb13;
  }
  &.fairly-confident {
    --background-color: #d3f1ff;
    --text-color: #108ee9;
    --border-color: #76d5ff;
  }
`;
