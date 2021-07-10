import { TCreateJobBody } from "../../pages/api/jobs";

/**
 * deleteJob - service to remove job from database
 * jobId - Id of job to remove
 */

export const deleteJob = async (jobId: string): Promise<Response> => {
  //   return a promise
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
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
