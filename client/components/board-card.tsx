import React, { FC, HTMLAttributes, useContext } from "react";
import { Box, useColorMode, Heading, Text, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { Map, Clock } from "react-feather";

import { Job } from "./board";
import { formatDate } from "../utils";
import { ConfidenceLevelBadge } from ".";
import { AppContextProps, RootAppContext } from "../pages/app";

export const BoardCard: FC<BoardCardProps> = ({ job, innerRef, ...props }) => {
  const { colorMode } = useColorMode();
  const appContext = useContext<AppContextProps | null>(
    RootAppContext
  ) as AppContextProps;
  const {
    position,
    location,
    companySite,
    date,
    companyName,
    confidenceLevel,
    updatedAt,
    _id,
  } = job;

  const { toggleJobInfoModal, setJobInfoId } = appContext;

  const textColorDim = colorMode === "light" ? "gray.600" : "gray.500";

  return (
    <StyledBoardCard
      bgColor={colorMode === "light" ? "white" : "gray.800"}
      {...props}
      ref={innerRef}
      boxShadow={
        colorMode === "light" ? "0 0 5px 2px rgba(0,0,0,0.06)" : "none"
      }
      onClick={() => {
        setJobInfoId({ jobId: _id, updatedAt });
        toggleJobInfoModal();
      }}
    >
      <ConfidenceLevelBadge confidenceLevel={confidenceLevel} />
      <Heading as="h4" className="unselectable">
        {position}
      </Heading>

      <Flex wrap="wrap" justifyContent="space-between">
        <Flex className="location" alignItems="center">
          <Map className="icon" />
          <Text
            className="mb-0 unselectable"
            color={textColorDim}
            fontSize="md"
          >
            {location}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Clock className="icon" />
          <Text
            className="mb-0 unselectable"
            color={textColorDim}
            fontSize="sm"
          >
            {formatDate(date)}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Image
            src={`https://logo.clearbit.com/${companySite}`}
            height="20"
            className="logo-img unselectable"
            width="20"
          />
          <Text
            className="company-name unselectable"
            color={textColorDim}
            fontSize="sm"
          >
            {companyName}
          </Text>
        </Flex>
      </Flex>
    </StyledBoardCard>
  );
};

interface BoardCardProps extends HTMLAttributes<HTMLElement> {
  /**
   * job - job to render
   */
  job: Job;

  /**
   * innerRef - ref to the inner element
   */
  innerRef: (ref: any) => void;
}

const StyledBoardCard = styled(Box)`
  padding: 1em 0.7em;
  margin-bottom: 1em;
  border-radius: var(--br-lg);
  display: block;

  .icon {
    height: 1em;
    width: 1em;
    margin-right: 0.35em;
    color: var(--chakra-colors-gray-500);
  }
  .location {
    flex: 1 100%;
  }
  h4 {
    font-size: 1rem;
  }
  .logo-img {
    border-radius: 1000px;
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .company-name {
    margin: 0;
    margin-left: 0.15em;
  }
`;
