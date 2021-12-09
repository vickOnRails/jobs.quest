// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const breakpoints = {
  sm: "768px",
  md: "1024px",
  lg: "1334px",
};

// 3. extend the theme
const theme = extendTheme({ config });
export default theme;
