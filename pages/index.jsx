import ErrorComponent from "../components/ErrorComponent";
//import { downloadData } from "../components/utils";
//import Page from "../components/Page";
import dynamic from "next/dynamic";
//import Page from "../components/Page";
import { TimelineAnimationWrapper } from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";

const Page = dynamic(() => import('../components/Page'), {ssr: true})



export default function Graphiql({desktopData, mobileData, isAuthorVersion, customHost, fetchError}) {

  if (!desktopData && !mobileData) {
    if(fetchError) return <ErrorComponent error={fetchError} />
    else return <ErrorComponent error="unknown error" />
  }

  const onServer = typeof window === 'undefined';

  if(onServer) {
    return (<>
      <ResizeProvider defaultWidth={12} defaultHeight={34}>
        <TimelineAnimationWrapper>
        <Page 
          desktopData={desktopData} 
          mobileData={mobileData} 
          isAuthorVersion={isAuthorVersion} 
          host={customHost} 
          className="mobileOnly"/>
        </TimelineAnimationWrapper>
      </ResizeProvider>
      <ResizeProvider defaultWidth={12} defaultHeight={34}>
        <TimelineAnimationWrapper>
        <Page 
          desktopData={desktopData} 
          mobileData={mobileData} 
          isAuthorVersion={isAuthorVersion} 
          host={customHost}
          className="desktopOnly"/>
        </TimelineAnimationWrapper>
      </ResizeProvider>
      </>)
  } else {
    return (
      <ResizeProvider>
        <TimelineAnimationWrapper>
        <Page desktopData={desktopData} mobileData={mobileData} isAuthorVersion={isAuthorVersion} host={customHost} />
        </TimelineAnimationWrapper>
      </ResizeProvider>
    )
  }
}

//switch between static and server side rendering
export async function getStaticProps() {
//export async function getServerSideProps() {

  const downloadData = (await import('../components/utils')).downloadData

  const hostConfig = {
    authorHost: "https://author-p81252-e700817.adobeaemcloud.com",
    publishHost: "https://publish-p81252-e700817.adobeaemcloud.com/",
    endpoint: "sample-wknd-app/homepage",
  };


  let props = {
    desktopData: await downloadData(hostConfig, "desktop"),
    mobileData: await downloadData(hostConfig, "mobile"),
    isAuthorVersion: false, 
    customHost: "https://publish-p81252-e700817.adobeaemcloud.com/", 
    fetchError: null
  };

  return {
    props: props
  };
}
