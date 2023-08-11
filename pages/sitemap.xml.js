//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITEMAP_S3_API_URL;


function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const response = await fetch(EXTERNAL_DATA_URL);
  const sitemap = await response.text();

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;