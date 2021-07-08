import { Job } from "../../components";

const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

interface JobResponse extends Response {
  success: boolean;
  job: Job;
  message?: string;
}

export const getJob = async (
  jobId: string | null
): Promise<JobResponse | null> => {
  if (jobId)
    return new Promise(async (resolve, reject) => {
      const url = `${baseUrl}/api/jobs/${jobId}`;
      try {
        const res = await fetch(url);
        if (res.ok) resolve(res.json());
      } catch (err) {
        reject(err);
      }
    });

  return null;
};
