import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <Global
    styles={css`
      @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap");

      html,
      body {
        --chakra-fonts-heading: "space grotesk", -apple-system,
          BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
          Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

        --br-lg: 12px;
        padding: 0;
        margin: 0;
        font-family: var(--chakra-fonts-heading);
      }

      .unselectable {
        user-select: none;
      }

      * {
        box-sizing: border-box;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-bottom: 0.5em;
        font-family: inherit;
      }
      p {
        margin-bottom: 1em;
      }

      // style for custom scrollbar

      .custom-scrollbar::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: inherit;
        border-radius: var(--br-lg);
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: var(--chakra-colors-gray-300);
        max-height: 10px;
        border-radius: var(--br-lg);
      }

      body.chakra-ui-dark .custom-scrollbar::-webkit-scrollbar-thumb {
        background: var(--chakra-colors-gray-700);
      }

      .custom-scrollbar::-webkit-scrollbar-button {
        background: inherit;
        border-radius: var(--br-lg);
      }
    `}
  />
);
