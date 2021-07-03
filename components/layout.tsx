import React, { FC, HTMLAttributes } from "react";

import { Nav } from ".";

/**
 *  Layout component to wrap all pages
 */
export const Layout: FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Nav />
      <main>{children}</main>
    </div>
  );
};

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}
