import React, { createContext, useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { DefaultUser, Session } from "next-auth";
import { Button, Flex } from "@chakra-ui/react";
import { Plus } from "react-feather";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { Layout, Container, Boards, Job } from "../../components";
import { ApplicationStage } from "../../types/types";
import jobModel from "../../models/job.model";

// Interface for user from NextAuth library
interface User extends Session {
  user: DefaultUser;
}

// interface for the context of the page
// TODO: I might have to move the context to the _app.js file to wrap the whole application
export interface AppContextProps {
  jobInfoModalOpen: boolean;
  toggleJobInfoModal: () => void;
}

export const RootAppContext = createContext<AppContextProps | null>(null);

// structure for the job data
const jobBoards: IBoard[] = [
  {
    jobs: [],
    title: "Saved",
    name: ApplicationStage.SAVED,
  },
  {
    jobs: [],
    title: "Preparing",
    name: ApplicationStage.PREPARING,
  },
  {
    jobs: [],
    title: "Applied",
    name: ApplicationStage.APPLIED,
  },
  {
    jobs: [],
    title: "Interviewing",
    name: ApplicationStage.INTERVIEWING,
  },
];

export interface IBoard {
  jobs: Job[];
  title: string;
  name: string;
}

const Index = ({
  session,
  jobs,
  error,
}: {
  session: User;
  jobs: Job[];
  error?: string;
}) => {
  const { user } = session;

  const [jobInfoModalOpen, setJobInfoModalOpen] = useState(false);

  const [jobsLoaded, setJobsLoaded] = useState(false);

  const toggleJobInfoModal = () => {
    setJobInfoModalOpen(!jobInfoModalOpen);
  };

  if (error) return <p>{error}</p>;

  useEffect(() => {
    // This is a fix for the useEffect not running on the client
    // run this function only when jobsLoaded changes (Technically only runs the once)
    if (!jobsLoaded) {
      const jobsLookup = jobBoards.map((board) => board.name);

      jobs.map((job) => {
        const index = jobsLookup.indexOf(job.applicationStage);
        jobBoards[index].jobs.push(job);
      });

      setJobsLoaded(true);
    }
  }, [jobsLoaded]);

  return (
    <Layout user={user} showHeader>
      <RootAppContext.Provider value={{ jobInfoModalOpen, toggleJobInfoModal }}>
        <StyledTrackerContainer className="jb-tracker">
          <Flex direction="column">
            <Button
              leftIcon={<Plus />}
              className="jb-tracker__add-job"
              variant="solid"
              bgColor="purple.500"
              onClick={toggleJobInfoModal}
              alignSelf="flex-end"
              color="white"
              _hover={{
                bgColor: "purple.400",
              }}
              _active={{
                bgColor: "purple.400",
              }}
            >
              Add Job
            </Button>
          </Flex>
          <Boards boards={jobBoards} />
        </StyledTrackerContainer>
      </RootAppContext.Provider>

      {jobInfoModalOpen && (
        <motion.div
          exit={{
            opacity: 0,
          }}
        >
          We Kept it open
        </motion.div>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (client) => {
  const { req } = client;
  const session = await getSession({ req });

  const url = `${process.env.NEXTAUTH_URL as string}/api/jobs`;

  // Redirect to root page if user is not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Get all jobs

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.success) {
      return {
        props: {
          session,
          error: data.message,
        },
      };
    }

    const { jobs } = data;

    return {
      props: {
        session,
        jobs,
      },
    };
  } catch (err) {
    console.log(err.message);
    return {
      props: {
        session,
        error: err.message,
      },
    };
  }
};

const StyledTrackerContainer = styled(Container)`
  .jb-tracker__add-job {
    align-self: flex-end;
    margin-bottom: 1em;
  }
`;
export default Index;
