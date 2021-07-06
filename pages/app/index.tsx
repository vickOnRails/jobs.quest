import React, { createContext, useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { DefaultUser, Session } from "next-auth";
import {
  Button,
  Flex,
  Input,
  FormLabel,
  FormControl,
  Box,
  Text,
  Divider,
  Select,
} from "@chakra-ui/react";
import { Plus } from "react-feather";
import styled from "@emotion/styled";
import { Formik, useFormik } from "formik";

import {
  Layout,
  Container,
  Boards,
  Job,
  BottomSheetModal,
} from "../../components";
import { ApplicationStage, ConfidenceLevel } from "../../types/types";
import { breakpoints } from "../../theme";
import { TCreateJobBody } from "../api/jobs";

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

// function for validating job form
const validate = (values: TCreateJobBody) => {
  const { position, companySite, companyName, confidenceLevel, jobLink } =
    values;
  const errors: any = {};

  if (!position) {
    errors.position = "Job position is a required field";
  }
  // ensure all fields are filled in

  return errors;
};

// initial form values
const initialValues: TCreateJobBody = {
  position: "",
  confidenceLevel: ConfidenceLevel.UNSELECTED,
  location: "",
  jobLink: "",
  companyName: "",
  companySite: "",
};
export interface IBoard {
  jobs: Job[];
  title: string;
  name: string;
}

const confidenceLevelOptions = Object.values(ConfidenceLevel);

// function to create new Job data
const createJob = async (values: TCreateJobBody): Promise<Response> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("/api/jobs", {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        resolve(res);
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      reject(err);
    }
  });
};

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

  const {
    handleChange,
    values: {
      confidenceLevel,
      companyName,
      companySite,
      position,
      location,
      jobLink,
    },
    handleSubmit,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const res = await createJob(values);
        if (res.ok) {
          console.log(await res.json());
        }
      } catch (err) {
        console.log(`An error occurred: ${err.message}`);
      }
    },
  });

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

          {jobInfoModalOpen && (
            <BottomSheetModal
              title="Job Details"
              isOpen={jobInfoModalOpen}
              onClose={toggleJobInfoModal}
            >
              <StyledJobInfoForm onSubmit={handleSubmit}>
                <Flex className="job-info__flex">
                  <FormControl id="position" className="job-info__form-control">
                    <FormLabel>Job Position</FormLabel>
                    <Input
                      // required
                      type="text"
                      // name="position"
                      placeholder="Job Position"
                      value={position}
                      onChange={handleChange}
                    />

                    {errors.position && <p>{errors.position}</p>}
                  </FormControl>
                  {/* <FormControl
                      id="confidenceLevel"
                      className="job-info__form-control"
                    >
                      <FormLabel>Confidence Level</FormLabel>
                      <Select
                        required
                        onChange={handleChange}
                        defaultValue="placeholder"
                      >
                        <option value="placeholder" disabled selected>
                          --Choose confidence level--
                        </option>
                        {confidenceLevelOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </Select>
                    </FormControl> */}
                  <FormControl id="jobLink" className="job-info__form-control">
                    <FormLabel>Link to Job</FormLabel>
                    <Input
                      type="url"
                      required
                      value={jobLink}
                      onChange={handleChange}
                      // id="jobLink"
                      placeholder="Link to Job Post"
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                  </FormControl>

                  <FormControl id="location" className="job-info__form-control">
                    <FormLabel>Location</FormLabel>
                    <Input
                      type="text"
                      required
                      value={location}
                      onChange={handleChange}
                      placeholder="Job Location"
                    />
                  </FormControl>
                </Flex>

                <Box mb={5} mt={3}>
                  <Text fontWeight="bold" mb={1}>
                    Company Information
                  </Text>
                  <Divider />
                </Box>

                <Flex>
                  <FormControl
                    id="companyName"
                    className="job-info__form-control"
                  >
                    <FormLabel>Company Name</FormLabel>
                    <Input
                      type="text"
                      required
                      value={companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      id="companyName"
                    />
                  </FormControl>
                  <FormControl
                    id="companySite"
                    className="job-info__form-control"
                  >
                    <FormLabel>Company Site</FormLabel>
                    <Input
                      type="url"
                      id="companySite"
                      value={companySite}
                      onChange={handleChange}
                      placeholder="Company website"
                    />
                  </FormControl>
                </Flex>

                <Button
                  type="submit"
                  variant="solid"
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  // onClick={handleSubmit}
                  bgColor="purple.500"
                  color="white"
                  _hover={{ bgColor: "purple.400" }}
                  _active={{ bgColor: "purple.400" }}
                >
                  Create Job
                </Button>
              </StyledJobInfoForm>
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

const StyledJobInfoForm = styled.form`
  height: 100%;

  .job-info__flex {
    flex-direction: column;
  }
  .job-info__flex {
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .job-info__form-control {
    margin-bottom: 1em;
  }

  @media screen and (min-width: ${breakpoints.sm}) {
    .job-info__flex {
      flex-direction: row;
      justify-content: flex-start;
    }
    .job-info__form-control {
      margin-right: 0.5em;
      flex-basis: 48%;
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    .job-info__form-control {
      flex-basis: 32%;
    }
  }
`;

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

export default Index;
