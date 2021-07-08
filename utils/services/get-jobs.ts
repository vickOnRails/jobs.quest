import { Job } from "../../components";

const baseUrl = process.env.NEXTAUTH_URL;

const url = `${baseUrl}/api/jobs`;

interface JobsResponse extends Response {
  success: boolean;
  jobs: Job[];
  message?: string;
}

export const getJobs = async (): Promise<JobsResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url);
      if (res.ok) resolve(res.json());
    } catch (err) {
      reject(err);
    }
  });
};
