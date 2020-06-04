import Head from 'next/head';

import HomePage from './HomePage';

const Index = () => (
  <div>
    <style global jsx> {
      `
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div,
        div#__next > div > div {
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
      `
    }
    </style>
    <Head>
      <title>Form Builder</title>
    </Head>
    <HomePage />
  </div>
);

export default Index;
