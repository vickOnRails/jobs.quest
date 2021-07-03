import React from "react";

import { getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { DefaultUser, Session } from "next-auth";

import { Layout, Header } from "../../components";

// Interface for user from NextAuth library
interface User extends Session {
  user: DefaultUser;
}

const Index = ({ session }: { session: User }) => {
  const { user } = session;

  return (
    <Layout>
      <Header user={user} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (client) => {
  const { req } = client;
  const session = await getSession({ req });

  // Redirect to root page if user is not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // else return auth session
  return {
    props: {
      session,
    },
  };
};
export default Index;
