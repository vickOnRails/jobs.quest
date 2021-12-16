import React, { createContext, useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { DefaultUser, Session } from "next-auth";
import { Button, Flex } from "@chakra-ui/react";
import { Plus } from "react-feather";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

import {
  Layout,
  Container,
  Boards,
  Job,
  Spinner,
  CreateEditJob,
  BottomSheetModal,
  TCreateJobBody,
} from "../../components";
import { ApplicationStage, ConfidenceLevel } from "../../types/types";
import { getJobs } from "../../utils/services/get-jobs";
import { getJob } from "../../utils/services/get-job";

// Interface for user from NextAuth library
interface User extends Session {
  user: DefaultUser;
}

// type for updating the selected job when modal is open
export type JobInfoProp = {
  jobId: string;
  updatedAt: string;
};

// interface for the context of the page
// TODO: I might have to move the context to the _app.js file to wrap the whole application
export interface AppContextProps {
  jobInfoModalOpen: boolean;
  toggleJobInfoModal: () => void;
  setJobInfoId: ({ jobId, updatedAt }: JobInfoProp) => void;
}

// root application context
export const RootAppContext = createContext<AppContextProps | null>(null);

// structure for the job data
// this structure will get filled when the jobs data come in
const jobBoards: IBoard[] = [
  {
    jobs: new Set(),
    title: "Saved",
    name: ApplicationStage.SAVED,
  },
  {
    jobs: new Set(),
    title: "Preparing",
    name: ApplicationStage.PREPARING,
  },
  {
    jobs: new Set(),
    title: "Applied",
    name: ApplicationStage.APPLIED,
  },
  {
    jobs: new Set(),
    title: "Interviewing",
    name: ApplicationStage.INTERVIEWING,
  },
  {
    jobs: new Set(),
    title: "Negotiating",
    name: ApplicationStage.NEGOTIATING,
  },
];

// initial form values
const initialValues: TCreateJobBody &
  Pick<Job, "applicationStage" | "createdAt"> = {
  title: "",
  confidenceLevel: ConfidenceLevel.UNSELECTED,
  applicationStage: ApplicationStage.SAVED,
  createdAt: Date.now(),
  jobLocation: "",
  link: "",
  companyName: "",
  companyWebsite: "",
};
export interface IBoard {
  // jobs: Job[];
  // TODO: use appropriate type when yyou find the type for sets
  jobs: Set<Job>;
  title: string;
  name: string;
}

/**
 * Index - main page of the app where all jobs are tracked
 */
const Index = ({
  session,
  jobs: initialJobsData,
  error,
}: {
  session: User;
  jobs: Job[];
  error?: string;
}) => {
  const { user } = session;

  // state controlling modal for job info
  const [jobInfoModalOpen, setJobInfoModalOpen] = useState(false);
  // the jobInfoId state holds the id of the job and the updatedAt timestamp of the selected job
  // the reason we're using the the updatedAt timestamp is because we want react query to refetch the job when we edit it
  // updated is the only field we're sure is going to change on that event
  const [jobInfoId, setJobInfoId] = useState<JobInfoProp | null>(null);

  const { data, refetch } = useQuery<any>("jobs", getJobs, {
    initialData: {
      jobs: initialJobsData,
    },
    refetchOnMount: true,
  });

  const { data: jobData, isLoading: isFetchingJobDataLoading } = useQuery(
    // this is where the bulk of the job info caching happens
    ["job", jobInfoId],
    () => jobInfoId && getJob(jobInfoId.jobId)
  );

  const { jobs } = data as { jobs: Job[] };
  const formValues = jobData?.job || initialValues;

  const toggleJobInfoModal = () => {
    setJobInfoModalOpen(!jobInfoModalOpen);
  };

  // open jobModal Info function
  const openJobInfoModal = () => {
    setJobInfoId(null);
    setJobInfoModalOpen(true);
  };

  // quickly ball out if we experience an error
  // TODO: handle error more robustly
  if (error) return <p>{error}</p>;

  useEffect(() => {
    // reset jobs set when the data comes in
    const jobsLookup = jobBoards.map((board) => {
      board.jobs = new Set();
      return board.name;
    });

    jobs.map((job: Job) => {
      const index = jobsLookup.indexOf(job.applicationStage);
      jobBoards[index].jobs.add(job);
    });
  }, [jobs]);

  return (
    <Layout user={user} showHeader>
      <RootAppContext.Provider
        value={{ jobInfoModalOpen, toggleJobInfoModal, setJobInfoId }}
      >
        <StyledTrackerContainer className="jb-tracker" fullWidth>
          <Flex direction="column">
            <Button
              leftIcon={<Plus />}
              className="jb-tracker__add-job"
              variant="solid"
              bgColor="purple.500"
              onClick={openJobInfoModal}
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

          {/* render all the jobs here */}

          <Boards boards={jobBoards} refetch={refetch} />

          {jobInfoModalOpen && (
            <BottomSheetModal
              title="Job Details"
              isOpen={jobInfoModalOpen}
              onClose={toggleJobInfoModal}
            >
              {isFetchingJobDataLoading ? (
                <Spinner />
              ) : (
                <CreateEditJob
                  initialValues={formValues}
                  setJobInfoModalOpen={setJobInfoModalOpen}
                  refetch={refetch}
                  jobId={jobInfoId}
                />
              )}
            </BottomSheetModal>
          )}
        </StyledTrackerContainer>
      </RootAppContext.Provider>
    </Layout>
  );
};

const StyledTrackerContainer = styled(Container)`
  .jb-tracker__add-job {
    align-self: flex-end;
    margin-bottom: 1em;
  }
`;

export const getServerSideProps: GetServerSideProps = async (client) => {
  const { req } = client;
  const session = await getSession({ req });

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
    // TODO: handle error. This can break the app
    const data = await getJobs();

    const { jobs } = data;

    return {
      props: {
        session,
        jobs,
      },
    };
  } catch (err: any) {
    return {
      props: {
        session,
        error: err.message,
      },
    };
  }
};

export default Index;
