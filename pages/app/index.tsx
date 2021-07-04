import React from "react";
import { getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { DefaultUser, Session } from "next-auth";
import { Button, Flex } from "@chakra-ui/react";
import { Plus } from "react-feather";
import styled from "@emotion/styled";

import { Layout, Container, Boards, Job } from "../../components";

// Interface for user from NextAuth library
interface User extends Session {
  user: DefaultUser;
}

const jobBoards: IBoard[] = [
  {
    jobs: [],
    title: "Saved",
    name: "saved",
  },
  {
    jobs: [],
    title: "Preparing",
    name: "preparing",
  },
  {
    jobs: [],
    title: "Applied",
    name: "applied",
  },
  {
    jobs: [],
    title: "Interviewing",
    name: "interviewing",
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

  if (error) return <p>{error}</p>;

  const jobsLookup = jobBoards.map((board) => board.name);

  jobs.map((job) => {
    const index = jobsLookup.indexOf(job.stage);
    jobBoards[index].jobs.push(job);
  });

  return (
    <Layout user={user} showHeader>
      <StyledTrackerContainer className="jb-tracker">
        <Flex direction="column">
          <Button
            leftIcon={<Plus />}
            className="jb-tracker__add-job"
            variant="solid"
            bgColor="purple.500"
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
    const { jobs } = await res.json();

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
