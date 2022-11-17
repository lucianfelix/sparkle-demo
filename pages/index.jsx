import ErrorComponent from "../components/ErrorComponent";
//import { downloadData } from "../components/utils";
//import Page from "../components/Page";
import dynamic from "next/dynamic";
//import Page from "../components/Page";
import { TimelineAnimationWrapper } from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";
import { useState, useEffect } from "react";

const Page = dynamic(() => import('../components/Page'), {ssr: true})

export default function Graphiql({desktopData, mobileData, isAuthorVersion, customHost, fetchError}) {
  const [onServer, setOnServer] = useState(true);

  useEffect(() => {
    setOnServer(false);
  }, []);

  if (!desktopData && !mobileData) {
    if(fetchError) return <ErrorComponent error={fetchError} />
    else return <ErrorComponent error="unknown error" />
  }

  if(onServer) {
    console.log("on server");
    return (<>
            <TimelineAnimationWrapper name="desktopOnly">
      <ResizeProvider defaultWidth={1024} defaultHeight={768}>

          {/* <div>desktopOnly</div> */}
          <Page 
            desktopData={desktopData} 
            mobileData={mobileData} 
            isAuthorVersion={isAuthorVersion} 
            host={customHost}
            className="desktopOnly"/>
      </ResizeProvider>
      <ResizeProvider defaultWidth={360} defaultHeight={640}>
          {/* <div>mobileOnly</div> */}
          <Page 
            desktopData={desktopData} 
            mobileData={mobileData} 
            isAuthorVersion={isAuthorVersion} 
            host={customHost} 
            className="mobileOnly"/>

      </ResizeProvider>
      </TimelineAnimationWrapper>

      </>)
  } else {
    return (
      
        <TimelineAnimationWrapper name="dynamic">
          <ResizeProvider>
        {/* <div>dynamic</div> */}
          <Page desktopData={desktopData} mobileData={mobileData} isAuthorVersion={isAuthorVersion} host={customHost} />
          </ResizeProvider>
        </TimelineAnimationWrapper>
      
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
