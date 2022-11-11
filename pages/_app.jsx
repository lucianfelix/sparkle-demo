import dynamic from 'next/dynamic';
import Head from "next/head";
import "../styles/globals.scss";
import { TimelineAnimationWrapper } from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";
import { BebasNeue, SourceSansPro } from '@next/font/google'
// import localFont from '@next/font/local'
//
// const adobeCleanRegular = localFont({ src: '../public/AdobeClean-Regular.otf' })
// const asarRegular = localFont({ src: '../public/Asar Regular.ttf' })

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sparkle Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ResizeProvider>
        <TimelineAnimationWrapper>
          <Component {...pageProps} />
        </TimelineAnimationWrapper>
      </ResizeProvider>
    </>
  );
}

export default MyApp;
