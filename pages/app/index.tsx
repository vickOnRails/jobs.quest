import React from "react";
import { Button, Avatar, useColorMode } from "@chakra-ui/react";
import { signOut, getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { Moon, Sun } from "react-feather";
import { DefaultUser, Session } from "next-auth";

import { Container } from "../../components";

const Index = ({ session }: { session: Session }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { user } = session;
  const { image, name } = user as DefaultUser;

  return (
    <Container>
      <p>Welcome {name}</p>

      {image && <Avatar src={image} />}
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <Moon /> : <Sun />}
      </Button>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (client) => {
  const { req } = client;
  const session = await getSession({ req });

  // Redirect to sign-in if user is not authenticated
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
