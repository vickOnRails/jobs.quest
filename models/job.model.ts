import mongoose from "mongoose";
import { ApplicationStage, ConfidenceLevel } from "../types/types";

/* PetSchema will correspond to a collection in your MongoDB database. */
const JobSchema = new mongoose.Schema(
  {
    position: {
      /* Job position */

      type: String,
      required: [true, "Please provide a position"],
    },
    companyName: {
      /* Company Name */

      type: String,
      required: [true, "Please provide the company's name"],
    },
    location: {
      /* Company Location */

      type: String,
      required: [true, "Please specify the job location"],
    },
    date: {
      /* Date saved */
      type: Date,
      default: Date.now,
      required: [true, "Please specify the date saved"],
    },
    applicationDate: {
      // date applied for job
      type: Date,
      default: Date.now,
    },
    confidenceLevel: {
      /* The level of confidence that my skills overlap with the requirements */
      type: String,
      required: [true, "Please provide a confidence level"],
      enum: Object.values(ConfidenceLevel),
    },

    applicationStage: {
      /* The stage of the job application*/

      type: "string",
      default: ApplicationStage.SAVED,
      enum: Object.values(ApplicationStage),
    },

    companySite: {
      /* The stage of the job application*/

      type: "string",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
// const Job = mongoose.model("Job", JobSchema);

// export default Job;
