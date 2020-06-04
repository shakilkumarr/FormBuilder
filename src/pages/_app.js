import React from 'react';
import PropTypes from 'prop-types';
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
      src: url('/static/fonts/Lato-LightItalic.ttf');
      src: url('/static/fonts/Lato-Thin.ttf');
      src: url('/static/fonts/Lato-ThinItalic.ttf');
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
`;

const MyApp = ({ Component, pageProps }) => (
  <React.Fragment>
    <GlobalStyle />
    <Component {...pageProps} />
  </React.Fragment>
);

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
