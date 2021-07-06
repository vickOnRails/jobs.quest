import React, { FC, HTMLAttributes } from "react";
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
import { ConfidenceLevel } from "../types/types";
import { TCreateJobBody } from "../pages/api/jobs";
import { useFormik } from "formik";
import { createJob } from "../utils/services/create-job";

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

/**
 * CreateEditJob  - Handles both creation of new jobs and editing of old ones
 */

export const CreateEditJob: FC<CreateEditJobProps> = ({
  initialValues,
  setJobInfoModalOpen,
}) => {
  const toast = useToast();
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
    handleBlur,
    isSubmitting,
    touched,
  } = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        const res = await createJob(values);
        if (res.ok) {
          toast({
            title: "Job Created",
            description: "Your job has been added to the database",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          setJobInfoModalOpen(false);
        }
      } catch (err) {
        // TODO: Handle error more robustly
        console.log(`An error occurred: ${err.message}`);
      }
    },
  });
  return (
    <StyledJobInfoForm onSubmit={handleSubmit}>
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

        <FormControl id="jobLink" className="job-info__form-control">
          <FormLabel>Link to Job</FormLabel>
          <Input
            type="url"
            value={jobLink}
            onBlur={handleBlur}
            onChange={handleChange}
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
      </Flex>

      <Box mb={5} mt={3}>
        <Text fontWeight="bold" mb={1}>
          Company Information
        </Text>
        <Divider />
      </Box>

      <Flex>
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
        isLoading={isSubmitting}
        loadingText="Submitting"
        bgColor="purple.500"
        color="white"
        _hover={{ bgColor: "purple.400" }}
        _active={{ bgColor: "purple.400" }}
      >
        Create Job
      </Button>
    </StyledJobInfoForm>
  );
};

interface CreateEditJobProps extends HTMLAttributes<HTMLFormElement> {
  /**
   * initialValues - initial values for the form
   * Will be empty when creating new jobs and set to the job object when editing
   */
  initialValues: TCreateJobBody;

  /**
   * setJobInfoModalOpen - function for closing the modal when we're done creating/editing a job
   */
  setJobInfoModalOpen: (open: boolean) => void;
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
