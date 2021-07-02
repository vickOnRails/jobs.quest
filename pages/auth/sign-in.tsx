import React from "react";
import { Button } from "@chakra-ui/react";
import {
  signIn,
  providers,
  getSession,
  ClientSafeProvider,
} from "next-auth/client";
import { GetServerSideProps } from "next";

const SignIn = ({ providers }: { providers: ClientSafeProvider }) => {
  return (
    <div>
      {Object.values(providers).map((provider: any) => {
        return (
          <Button key={provider.id} onClick={() => signIn(provider.id)}>
            {provider.name}
          </Button>
        );
      })}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, req } = context;

  const session = await getSession({ req });

  // redirect to app if user is already signed in
  if (session && req) {
    return {
      redirect: {
        permanent: false,
        destination: "/app",
      },
    };
  }

  // return authentication information to
  return {
    props: {
      session,
      providers: await providers(),
    },
  };
};

export default SignIn;
