import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-size: 1.6rem;
    }

    html {
        scroll-behavior: smooth;
        font-size: 62.5%;
    }
`;
