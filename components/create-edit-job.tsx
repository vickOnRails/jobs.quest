import React, { FC, FormEvent, HTMLAttributes } from "react";
import {
  Input,
  FormLabel,
  FormControl,
  Box,
  Text,
  Divider,
  Flex,
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

// function for validating job form
const validate = (values: TCreateJobBody) => {
  const {
    position,
    companySite,
    location,
    companyName,
    confidenceLevel,
    jobLink,
  } = values;

  const errors: any = {};

  if (!position) {
    errors.position = "Job position is a required field";
  }

  if (!companySite) errors.companySite = "Company site is a required field";
  if (!companyName) errors.companyName = "Company Name is a required field";
  if (!jobLink) errors.jobLink = "Job Link is a required field";
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
  const { handleChange, values, errors, handleBlur, touched } = useFormik({
    initialValues,
    validate: validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { mutate: createJobMutation, isLoading } = useMutation(
    async (evt: FormEvent) => {
      // prevent page from reloading
      evt.preventDefault();

      // call service for creating job
      await createJob({
        confidenceLevel,
        companyName,
        companySite,
        position,
        location,
        jobLink,
      });

      // show a success toast
      toast({
        title: "Job Created",
        description: "Your job has been added to the database",
        status: "success",
        duration: 1000,
        isClosable: true,
      });

      // implement a react-query refetch
      await refetch();

      // close job info modal
      setJobInfoModalOpen(false);
    }
  );

  const {
    confidenceLevel,
    companyName,
    companySite,
    position,
    date: dateAdded,
    applicationStage,
    location,
    jobLink,
  } = values;

  return (
    <StyledJobInfoForm onSubmit={createJobMutation}>
      <Flex className="job-info__flex">
        <FormControl id="position" className="job-info__form-control">
          <FormLabel>Job Position</FormLabel>
          <Input
            type="text"
            placeholder="Job Position"
            value={position}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          {errors.position && touched.position && (
            <FormErrorText>
              <Text mb={0}>{errors.position}</Text>
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

        <FormControl id="jobLink" className="job-info__form-control">
          <FormLabel>Link to Job</FormLabel>
          <Input
            type="url"
            value={jobLink}
            onBlur={handleBlur}
            onChange={handleChange}
            name="jobLink"
            // id="jobLink"
            placeholder="Link to Job Post"
          />
          {errors.jobLink && touched.jobLink && (
            <FormErrorText>
              <Text mb={0}>{errors.jobLink}</Text>
            </FormErrorText>
          )}
        </FormControl>

        <FormControl id="location" className="job-info__form-control">
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={location}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Job Location"
          />
          {errors.location && touched.location && (
            <FormErrorText>
              <Text mb={0}>{errors.location}</Text>
            </FormErrorText>
          )}
        </FormControl>

        {jobId && (
          <FormControl id="date" className="job-info__form-control">
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

        <FormControl id="companySite" className="job-info__form-control">
          <FormLabel>Company Site</FormLabel>
          <Input
            type="url"
            id="companySite"
            value={companySite}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Company website"
          />
          {errors.companySite && touched.companySite && (
            <FormErrorText>
              <Text mb={0}>{errors.companySite}</Text>
            </FormErrorText>
          )}
        </FormControl>
      </Flex>

      <Button
        type="submit"
        variant="solid"
        isLoading={isLoading}
        loadingText="Submitting"
        bgColor="purple.500"
        color="white"
        _hover={{ bgColor: "purple.400" }}
        _active={{ bgColor: "purple.400" }}
      >
        {jobId ? "Update Job" : "Create Job"}
      </Button>
    </StyledJobInfoForm>
  );
};

interface CreateEditJobProps extends HTMLAttributes<HTMLFormElement> {
  /**
   * initialValues - initial values for the form
   * Will be empty when creating new jobs and set to the job object when editing
   */
  initialValues: TCreateJobBody & Pick<Job, "applicationStage" | "date">;

  /**
   * setJobInfoModalOpen - function for closing the modal when we're done creating/editing a job
   */
  setJobInfoModalOpen: (open: boolean) => void;

  refetch: any;

  jobId: string | null;

  // setJobsLoaded: any;
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
