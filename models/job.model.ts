import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const JobSchema = new mongoose.Schema(
  {
    position: {
      /* The name of this pet */

      type: String,
      required: [true, "Please provide a position"],
    },
    company_name: {
      /* The owner of this pet */

      type: String,
      required: [true, "Please provide the company's name"],
    },
    location: {
      /* The species of your pet */

      type: String,
      required: [true, "Please specify the job location"],
    },
    date: {
      /* Pet's age, if applicable */

      type: Date,
      default: Date.now,
    },
    stage: {
      // ensure itn is one of the following
      type: "string",
      required: [true, "Please specify the species of your pet."],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
