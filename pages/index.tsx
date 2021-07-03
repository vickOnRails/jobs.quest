import Head from "next/head";
import Image from "next/image";
import {
  ListItem,
  ListIcon,
  Button,
  UnorderedList,
  Heading,
  ButtonGroup,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ArrowRight, GitHub } from "react-feather";
import styled from "@emotion/styled";
import {
  signIn,
  providers,
  getSession,
  ClientSafeProvider,
} from "next-auth/client";
import { GetServerSideProps } from "next";

import { Container } from "../components";
import { breakpoints } from "../theme";
import { Session } from "next-auth";

export default function Home({
  session,
  providers,
}: {
  session: Session;
  providers: ClientSafeProvider;
}) {
  return (
    <StyledLanding>
      <Head>
        <title>Jobs Quest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="landing">
        <Flex as="main" className="landing__container">
          <article className="landing__banner-img-wrapper">
            <div className="landing__banner-img">
              <Image
                src="/road-illustration.png"
                alt=""
                width={300}
                height={300}
              />
            </div>
          </article>
          <article className="landing-content">
            <div>
              <Heading as="h1">
                Jobs.quest - An operating system for your job search.
              </Heading>
              <Text>
                Jobs.quest is an open source, self hosted app to track and
                manage all your job applications. Sign In to try it out. Also
                checkout the{" "}
                <a
                  href="https://github.com/vickOnRails/jobs.quest"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  github
                </a>{" "}
                repository and contribute if you can...
              </Text>

              <UnorderedList className="no-list-style">
                <ListItem>
                  <ListIcon as={ArrowRight} />
                  Once click deploy to Vercel, Netlify, AWS.
                </ListItem>
                <ListItem>
                  <ListIcon as={ArrowRight} />
                  Written with serverless functions - No backend required.
                </ListItem>
                <ListItem>
                  <ListIcon as={ArrowRight} />
                  Open source & self hosted - Connect to your mongo database
                  anywhere.
                </ListItem>
                <ListItem>
                  <ListIcon as={ArrowRight} />
                  Manage all prospective jobs & applications in one place.
                </ListItem>
              </UnorderedList>
            </div>

            <div>
              <ButtonGroup spacing={2}>
                {Object.values(providers).map((provider: any) => {
                  return (
                    <Button
                      key={provider.id}
                      onClick={() => signIn(provider.id)}
                      variant="solid"
                      backgroundColor="#2ea043"
                      color="white"
                      _hover={{
                        backgroundColor: "#238636",
                      }}
                      _active={{
                        backgroundColor: "#238636",
                      }}
                    >
                      <GitHub className="github-icon" /> {provider.name} Sign in
                    </Button>
                  );
                })}

                <Button disabled variant="outline">
                  Email Sign in
                </Button>
              </ButtonGroup>
            </div>
          </article>
        </Flex>
      </Container>
    </StyledLanding>
  );
}

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

const StyledLanding = styled.section`
  .landing__banner-img-wrapper {
    background: white;
    width: 100%;
    margin-bottom: 1em;
    display: flex;
  }
  .landing__banner-img {
    margin: auto;
    display: block;
  }
  .no-list-style {
    list-style-type: none;
    margin-inline-start: 0;
  }
  .landing__container {
    flex-direction: column;
  }
  ul {
    margin-bottom: 1em;
  }
  .landing__banner-img-wrapper {
    background: #fffafa;
  }
  .landing__banner-img-wrapper,
  .landing-content {
    flex: 1;
  }
  .github-icon {
    height: 20px;
    width: 20px;
    margin-right: 0.5em;
  }

  @media screen and (min-width: ${breakpoints.sm}) {
    .landing__container {
      flex-direction: row;
      align-items: center;
      margin: 1em auto;
    }
    .landing {
      display: flex;
    }
    .landing__banner-img-wrapper {
      margin-bottom: 0;
      height: 100%;
      max-height: 43em;
    }
    .landing {
      min-height: 100vh;
    }
    .landing-content {
      padding: 1em;
    }
  }
`;
