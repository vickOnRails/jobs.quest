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
} from "../../components";
import { ApplicationStage, ConfidenceLevel } from "../../types/types";
import { TCreateJobBody } from "../api/jobs";
import { getJobs } from "../../utils/services/get-jobs";
import { getJob } from "../../utils/services/get-job";

// Interface for user from NextAuth library
interface User extends Session {
  user: DefaultUser;
}

// interface for the context of the page
// TODO: I might have to move the context to the _app.js file to wrap the whole application
export interface AppContextProps {
  jobInfoModalOpen: boolean;
  toggleJobInfoModal: () => void;
  setJobInfoId: (jobId: string) => void;
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
];

// initial form values
const initialValues: TCreateJobBody & Pick<Job, "applicationStage" | "date"> = {
  position: "",
  confidenceLevel: ConfidenceLevel.UNSELECTED,
  applicationStage: ApplicationStage.SAVED,
  date: Date.now(),
  location: "",
  jobLink: "",
  companyName: "",
  companySite: "",
};
export interface IBoard {
  // jobs: Job[];
  jobs: any;
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
  const [jobInfoId, setJobInfoId] = useState<string | null>(null);

  const { data, refetch } = useQuery<any>("jobs", getJobs, {
    initialData: {
      jobs: initialJobsData,
    },
    refetchOnMount: true,
  });
  const { data: jobData, isLoading: isFetchingJobDataLoading } = useQuery(
    ["job", jobInfoId],
    () => getJob(jobInfoId)
  );

  const { jobs } = data as { jobs: Job[] };
  const formValues = jobData?.job || initialValues;

  // quick fix for when useEffect doesnt run on the client side
  // const [jobsLoaded, setJobsLoaded] = useState(false);

  const toggleJobInfoModal = () => {
    setJobInfoModalOpen(!jobInfoModalOpen);
  };

  const openJobInfoModal = () => {
    setJobInfoId(null);
    setJobInfoModalOpen(true);
  };

  // quickly ball out if we experience an error
  // TODO: handle error more robustly
  if (error) return <p>{error}</p>;

  useEffect(() => {
    const jobsLookup = jobBoards.map((board) => board.name);

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
        <StyledTrackerContainer className="jb-tracker">
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
          <Boards boards={jobBoards} />

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

export default Index;
