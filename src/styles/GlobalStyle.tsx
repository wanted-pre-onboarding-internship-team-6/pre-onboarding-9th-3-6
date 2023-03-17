import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin:0 ;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 400;
    line-height: 1.5;
    overflow: hidden;
  }
`;

const size = {
  mobile: '640px',
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
};
