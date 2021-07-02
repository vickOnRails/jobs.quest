import Head from "next/head";
import NextLink from "next/link";
import { Heading, Link } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jobs Quest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading as="h1">Jobs Quest</Heading>
        <Link href="/auth/sign-in" as={NextLink}>
          <a>Login</a>
        </Link>
      </main>
    </div>
  );
}
