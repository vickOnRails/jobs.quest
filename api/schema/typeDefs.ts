import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  # Job schema
  type Job {
    id: String!
    companyName: String!
    title: String!
    confidenceLevel: String
    applicationStage: String
    postedAt: Date
    expiringAt: Date
    appliedAt: Date
    link: String!
    notes: [Note]!
    companyWebsite: String
    jobLocation: String!
    createdAt: Date!
    updatedAt: Date
  }

  type Note {
    id: String!
    body: String!
    createdAt: Date!
    updatedAt: Date!

    ownerId: String
    owner: User

    jobId: String
    job: Job
  }

  type User {
    id: String!
    fullname: String!
    email: String!
    accountVerified: Boolean!
    createdAt: Date!
  }

  # Input types
  input CreateJobInput {
    companyName: String!
    title: String!
    link: String!
    jobLocation: String!
    confidenceLevel: ConfidenceLevel
    companyWebsite: String
  }

  input CreateNoteInput {
    body: String!
  }

  input UpdateNoteInput {
    body: String
  }

  enum ConfidenceLevel {
    UNSELECTED
    FAIR_ATTEMPT
    OPTIMISTIC
    FAIRLY_CONFIDENT
    CONFIDENT
    HIGHLY_CONFIDENT
  }

  input UpdateJobInput {
    companyName: String
    title: String
    confidenceLevel: String
    applicationStage: String
    postedAt: Date
    expiringAt: Date
    appliedAt: Date
    link: String
    companyWebsite: String
    jobLocation: String
  }

  type AuthenticatedUser {
    id: String!
    email: String!
    fullname: String!
    accountVerified: Boolean!
    token: String!
  }

  input CreateAccountInput {
    email: String!
    password: String!
    fullname: String!
  }

  input SignInInput {
    email: String!
    fullname: String!
  }

  # Queries
  type Query {
    jobs(email: String): [Job!]!
    job(id: ID!): Job!
  }

  # Mutations
  type Mutation {
    # Job Mutation
    createJob(job: CreateJobInput!): Job!
    deleteJob(id: ID!): Job!
    updateJob(id: ID!, job: UpdateJobInput!): Job!

    # Notes Mutation
    createNote(note: CreateNoteInput!, jobId: String!): Note!
    deleteNote(id: ID!): Note!
    updateNote(id: ID!, note: UpdateNoteInput!): Note!

    # Authentication Mutation
    signIn(user: SignInInput!): AuthenticatedUser!
  }
`;

export default typeDefs;
