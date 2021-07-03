import React, { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";

import { Nav, Header } from ".";
import { DefaultUser } from "next-auth";

/**
 *  Layout component to wrap all pages
 */
export const Layout: FC<LayoutProps> = ({
  children,
  user,
  showHeader,
  ...props
}) => {
  return (
    <StyledLayout {...props}>
      <Nav />
      {showHeader && <Header user={user} />}
      <main className="main">{children}</main>
    </StyledLayout>
  );
};

const StyledLayout = styled.div``;

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * user - user from NextAuth return object
   */
  user: DefaultUser;

  /**
   * showHeader - should header component be shown
   */
  showHeader?: boolean;
}
