import { createGlobalStyle } from 'styled-components';
import { FONTS, COLORS } from './src/constants';

const GlobalStyles = createGlobalStyle`


:root {
    line-height: 1.5;
    color-scheme: light dark;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  *, ::after, ::before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  @media (prefers-reduced-motion: no-preference) {
    html {
        scroll-behavior: smooth;
    }
  }

  body {

    background-color: ${COLORS.gray['body']};
    font-size: 16px;
    color: ${COLORS.black};
    overflow-y: scroll;
    overflow-x: hidden;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  label {font-family: 'Helvetica', sans-serif;
    font-size: ${FONTS.text['normal']};
  font-weight: 300;}

  input, button, textarea, select {
    font-family: 'Helvetica', sans-serif;
    font-size: ${FONTS.text['normal']};
    border: 1px solid ${COLORS.gray.divider};
    border-radius: 30px;
    padding: 8px 15px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Monument', sans-serif;
    font-weight: 400;
    overflow-wrap: break-word;
  }

  p {
    font-family: 'Helvetica', sans-serif;
    font-weight: 300;
    font-size: ${FONTS.text['normal']};
    line-height: 26px;
  }

  input:focus,
  button:focus,
  textarea:focus,
  select:focus{
    outline: ${COLORS.almostTransparent};
    border-color: ${COLORS.primaryBlue};
  }

  a {color: ${COLORS.primaryBlue}; font-family: 'Helvetica', sans-serif; cursor: pointer; text-decoration: none; transition: all 150ms ease-in;}
  a:hover,
  a:focus {color: #7AB4CD;}
 
  #root, #__next {
    isolation: isolate;
    height: 100%;
    height: 100dvh;
  }

  ul{font-family: 'Helvetica', sans-serif;margin:0; padding:0; list-style: none;}
	li{margin:0; padding:0;}
`;

export default GlobalStyles;

