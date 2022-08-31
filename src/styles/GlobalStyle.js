import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-size: 16px;
    margin:0;
    padding:0;
  }
  
  body {
    background: #ffffff;
    box-sizing: border-box;
    margin: 0 auto;
  }
  h1 {
    margin: 0;
    font-size: 32px;
  }
  h2 {
    margin: 0;
    font-size: 28px;
  }
  h3 {
    margin: 0;
    font-size: 24px;
  }
  ul {
    list-style: none;
  }
  p {
    margin: 0;
  }
`;

export default GlobalStyle;