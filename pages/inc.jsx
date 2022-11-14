import ErrorComponent from "../components/ErrorComponent";
import { downloadData } from "../components/utils";
import Page from "../components/Page";
import dynamic from "next/dynamic";

const PageDynamic = dynamic(() => import('../components/Page'), {ssr: true})

export default function Inc({desktopData, mobileData, isAuthorVersion, customHost, fetchError}) {

  return !desktopData && !mobileData ? (
    fetchError ? (
      <ErrorComponent type={fetchError.type} url={fetchError.host} error={fetchError.error} />
    ) : null
  ) : (
    <PageDynamic desktopData={desktopData} mobileData={mobileData} isAuthorVersion={isAuthorVersion} host={customHost} />
  );
}

//switch between static and server side rendering
export async function getStaticProps() {
//export async function getServerSideProps() {

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
    props: props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    revalidate: 600, // In seconds
  }
}
