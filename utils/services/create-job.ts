import { TCreateJobBody } from "../../pages/api/jobs";

/**
 * createJob - service to take care of API calls for creating a new job
 * values - Value of jobs to be created
 */
export const createJob = async (values: TCreateJobBody): Promise<Response> => {
  // return a promise
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("/api/jobs", {
        body: JSON.stringify(values),
        method: "POST",
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
