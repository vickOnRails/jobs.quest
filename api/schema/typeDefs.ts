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
    companyWebsite: String
    jobLocation: String!
    createdAt: Date!
    updatedAt: Date
  }

  # Input types
  input CreateJobInput {
    companyName: String!
    title: String!
    link: String!
    jobLocation: String!
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

    # Authentication Mutation
    signIn(user: SignInInput!): AuthenticatedUser!
  }
`;

export default typeDefs;
