import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'LatoRegular';
      src: url('/static/fonts/Lato-Regular.ttf');
  }
  @font-face {
    font-family: 'LatoBlack';
      src: url('/static/fonts/Lato-Black.ttf');
  }
  @font-face {
    font-family: 'LatoBlackItalic';
      src: url('/static/fonts/Lato-BlackItalic.ttf');
  }
  @font-face {
    font-family: 'LatoBold';
      src: url('/static/fonts/Lato-Bold.ttf');
  }
  @font-face {
    font-family: 'LatoBoldItalic';
      src: url('/static/fonts/Lato-BoldItalic.ttf');
  }
  @font-face {
    font-family: 'LatoItalic';
      src: url('/static/fonts/Lato-Italic.ttf');
  }
  @font-face {
    font-family: 'LatoLight';
      src: url('/static/fonts/Lato-Light.ttf');
  }
  @font-face {
    font-family: 'LatoLightItalic';
      src: url('/static/fonts/Lato-LightItalic.ttf');
  }
  @font-face {
    font-family: 'LatoThin';
      src: url('/static/fonts/Lato-Thin.ttf');
  }
  @font-face {
    font-family: 'LatoThinItalic';
      src: url('/static/fonts/Lato-ThinItalic.ttf');
  }
  html,
  body,
  div#__next{
    height: 100%;
  }
  html {
    font-size: 10px;
  }
  body {
    margin: 0;
    font-family: 'LatoRegular', arial, sans-serif;
    font-size: 1.4rem;
    letter-spacing: 0.1rem;
  }
  #__next-prerender-indicator {
    display: none;
  }
`;

const MyApp = ({ Component, pageProps }) => (
  <React.Fragment>
    <GlobalStyle />
    <Head><title>Form Builder</title></Head>
    <Component {...pageProps} />
  </React.Fragment>
);

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
