import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// setup NextAuth provider for just Github for now
// TODO: add more providers

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
