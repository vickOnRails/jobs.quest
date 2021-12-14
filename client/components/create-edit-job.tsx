import React, { useState, FC, FormEvent, HTMLAttributes } from "react";
import {
  Input,
  FormLabel,
  FormControl,
  Box,
  Text,
  Divider,
  Flex,
  Stack,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

import { breakpoints } from "../theme";
import { FormErrorText } from ".";
import { ApplicationStage, ConfidenceLevel } from "../types/types";
import { TCreateJobBody } from "../pages/api/jobs";
import { useFormik } from "formik";
import { createJob } from "../utils/services/create-job";
import { useMutation } from "react-query";
import { Job } from "./board";
import { formatDate } from "../utils";
import { deleteJob } from "../utils/services/delete-job";
import { editJob } from "../utils/services/edit-job";
import { JobInfoProp } from "../pages/app";

// function for validating job form
const validate = (values: TCreateJobBody) => {
  const { title, companyWebsite, companyName, confidenceLevel, link } = values;

  const errors: any = {};

  if (!title) {
    errors.title = "Job position is a required field";
  }

  if (!companyWebsite) errors.companySite = "Company site is a required field";
  if (!companyName) errors.companyName = "Company Name is a required field";
  if (!link) errors.link = "Job Link is a required field";
  if (!location) errors.location = "Location is a required field";

  if (!confidenceLevel) {
    errors.confidenceLevel = "Location is a required field";
  } else if (confidenceLevel === ConfidenceLevel.UNSELECTED) {
    errors.confidenceLevel = "Please select a valid confidence level";
  }

  return errors;
};

const confidenceLevelOptions = Object.values(ConfidenceLevel);
const applicationLevelOptions = Object.values(ApplicationStage);

/**
 * CreateEditJob  - Handles both creation of new jobs and editing of old ones
 */

export const CreateEditJob: FC<CreateEditJobProps> = ({
  initialValues,
  setJobInfoModalOpen,
  refetch,
  jobId,
}) => {
  const toast = useToast();
  const [submissionError, setSubmissionError] = useState("");
  const { handleChange, values, errors, handleBlur, touched } = useFormik({
    initialValues,
    validate: validate,
    onSubmit: (values) => {},
  });

  const { mutate: createJobMutation, isLoading } = useMutation(
    async (evt: FormEvent) => {
      toast.closeAll();
      // prevent page from reloading
      evt.preventDefault();
      setSubmissionError("");

      try {
        jobId
          ? await editJob(
              {
                confidenceLevel,
                companyName,
                companyWebsite,
                applicationStage,
                title,
                jobLocation,
                link,
              },
              jobId.jobId
            )
          : await createJob({
              confidenceLevel,
              companyName,
              companyWebsite,
              title,
              jobLocation,
              link,
            });

        // show a success toast
        toast({
          title: jobId ? `Job Edited` : `Job Created`,
          description: jobId
            ? "Your job has been edited"
            : "Your job has been added to the database",
          status: "success",
          duration: 1000,
          isClosable: true,
        });

        // implement a react-query refetch
        await refetch();

        // close job info modal
        setJobInfoModalOpen(false);
      } catch (err) {
        if (err instanceof Error) {
          // @ts-ignore
          setSubmissionError(err.response.errors[0].message);
          toast({
            title: "An error occurred",
            status: "error",
            // @ts-ignore
            description: err.response && err.response.errors[0].message,
            duration: 5000,
            position: "top",
            isClosable: true,
          });
        }
        // @ts-ignore
        // alert(err.message);
      }

      // Check for the presence of the jobId.
      // If it's available, we know this is an edit event and we call the edit service
      // Else we create the new job
    }
  );

  const {
    mutate: deleteJobMutation,
    isLoading: isDeleting,
    error,
    data,
  } = useMutation(async (jobId: string) => {
    setSubmissionError("");
    try {
      await deleteJob(jobId);
      await refetch();

      setJobInfoModalOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        // @ts-ignore
        setSubmissionError(err.response.errors[0].message);
        toast({
          title: "An error occurred",
          status: "error",
          // @ts-ignore
          description: err.response && err.response.errors[0].message,
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
    }
  });

  const {
    confidenceLevel,
    companyName,
    companyWebsite,
    title,
    createdAt: dateAdded,
    applicationStage,
    jobLocation,
    link,
  } = values;

  return (
    <StyledJobInfoForm onSubmit={createJobMutation}>
      <Flex className="job-info__flex">
        <FormControl id="title" className="job-info__form-control">
          <FormLabel>Job Position</FormLabel>
          <Input
            type="text"
            placeholder="Job Position"
            value={title}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          {errors.title && touched.title && (
            <FormErrorText>
              <Text mb={0}>{errors.title}</Text>
            </FormErrorText>
          )}
        </FormControl>

        <FormControl id="confidenceLevel" className="job-info__form-control">
          <FormLabel>Confidence Level</FormLabel>
          <Select
            onChange={handleChange}
            defaultValue={confidenceLevel}
            onBlur={handleBlur}
          >
            {confidenceLevelOptions.map((option) => {
              if (option === ConfidenceLevel.UNSELECTED)
                return (
                  <option key={option} disabled>
                    {option}
                  </option>
                );
              return <option key={option}>{option}</option>;
            })}
          </Select>

          {errors.confidenceLevel && touched.confidenceLevel && (
            <FormErrorText>
              <Text mb={0}>{errors.confidenceLevel}</Text>
            </FormErrorText>
          )}
        </FormControl>

        {jobId && (
          <FormControl id="applicationStage" className="job-info__form-control">
            <FormLabel>Application Stage</FormLabel>
            <Select
              onChange={handleChange}
              defaultValue={applicationStage}
              onBlur={handleBlur}
            >
              {applicationLevelOptions.map((option) => {
                return <option key={option}>{option}</option>;
              })}
            </Select>

            {errors.confidenceLevel && touched.confidenceLevel && (
              <FormErrorText>
                <Text mb={0}>{errors.confidenceLevel}</Text>
              </FormErrorText>
            )}
          </FormControl>
        )}

        <FormControl id="link" className="job-info__form-control">
          <FormLabel>Link to Job</FormLabel>
          <Input
            type="url"
            value={link}
            onBlur={handleBlur}
            onChange={handleChange}
            // name="jobLink"
            // id="jobLink"
            placeholder="Link to Job Post"
          />
          {errors.link && touched.link && (
            <FormErrorText>
              <Text mb={0}>{errors.link}</Text>
            </FormErrorText>
          )}
        </FormControl>

        <FormControl id="jobLocation" className="job-info__form-control">
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={jobLocation}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Job Location"
          />
          {errors.jobLocation && touched.jobLocation && (
            <FormErrorText>
              <Text mb={0}>{errors.jobLocation}</Text>
            </FormErrorText>
          )}
        </FormControl>

        {jobId && (
          <FormControl id="createdAt" className="job-info__form-control">
            <FormLabel>Saved At</FormLabel>
            <Input
              type="text"
              value={formatDate(dateAdded)}
              disabled
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Date Added"
            />
          </FormControl>
        )}
      </Flex>

      <Box mb={5} mt={3}>
        <Text fontWeight="bold" mb={1}>
          Company Information
        </Text>
        <Divider />
      </Box>

      <Flex className="job-info__flex">
        <FormControl id="companyName" className="job-info__form-control">
          <FormLabel>Company Name</FormLabel>
          <Input
            type="text"
            value={companyName}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter company name"
            id="companyName"
          />
          {errors.companyName && touched.companyName && (
            <FormErrorText>
              <Text mb={0}>{errors.companyName}</Text>
            </FormErrorText>
          )}
        </FormControl>

        <FormControl id="companyWebsite" className="job-info__form-control">
          <FormLabel>Company Site</FormLabel>
          <Input
            type="url"
            value={companyWebsite}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Company website"
          />
          {errors.companyWebsite && touched.companyWebsite && (
            <FormErrorText>
              <Text mb={0}>{errors.companyWebsite}</Text>
            </FormErrorText>
          )}
        </FormControl>
      </Flex>

      {submissionError && (
        <Box bgColor="red.100" p="3" rounded="md" mb="3.5">
          <Text color="red.400" fontWeight="bold" mb={0}>
            {submissionError}
          </Text>
        </Box>
      )}

      <Stack spacing={3} direction="row">
        <Button
          type="submit"
          variant="solid"
          isLoading={isLoading}
          loadingText={jobId?.jobId ? "Updating" : "Submitting"}
          bgColor="purple.500"
          color="white"
          disabled={JSON.stringify(errors) !== "{}"}
          _hover={{ bgColor: "purple.400" }}
          _active={{ bgColor: "purple.400" }}
        >
          {jobId ? "Update Job" : "Create Job"}
        </Button>

        {jobId && (
          <Button
            variant="solid"
            colorScheme="red"
            loadingText="Deleting"
            onClick={() => deleteJobMutation(jobId.jobId)}
            isLoading={isDeleting}
          >
            Delete Job
          </Button>
        )}
      </Stack>
    </StyledJobInfoForm>
  );
};

interface CreateEditJobProps extends HTMLAttributes<HTMLFormElement> {
  /**
   * initialValues - initial values for the form
   * Will be empty when creating new jobs and set to the job object when editing
   */
  initialValues: TCreateJobBody & Pick<Job, "applicationStage" | "createdAt">;

  /**
   * setJobInfoModalOpen - function for closing the modal when we're done creating/editing a job
   */
  setJobInfoModalOpen: (open: boolean) => void;

  refetch: any;

  jobId: JobInfoProp | null;
}

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
