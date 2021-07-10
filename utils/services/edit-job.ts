import { Job } from "../../components";
import { TCreateJobBody } from "../../pages/api/jobs";

/**
 * editJob - service to take care of API calls for editing a  job
 * values - Value of jobs to be replaced
 */

export const editJob = async (
  values: TCreateJobBody & Pick<Job, "applicationStage">,
  jobId: string
): Promise<Response> => {
  // return a promise
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        body: JSON.stringify(values),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // resolve promise if API call is successful
      if (res.ok) {
        resolve(res);
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      // else reject the promise
      reject(err);
    }
  });
};
