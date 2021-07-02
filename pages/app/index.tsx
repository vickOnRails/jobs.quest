import React from "react";
import { Button, Avatar } from "@chakra-ui/react";
import { signOut, getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { DefaultUser, Session } from "next-auth";

const Index = ({ session }: { session: Session }) => {
  const { user } = session;
  const { image, name } = user as DefaultUser;

  return (
    <div>
      <p>Welcome {name}</p>

      {image && <Avatar src={image} />}

      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (client) => {
  const { req } = client;
  const session = await getSession({ req });

  // Redirect to sign-in if user is not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/auth/sign-in",
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
