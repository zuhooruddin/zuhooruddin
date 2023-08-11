import Head from "next/head";
import React from "react";


const SEO = ({ title, description,metaTitle, sitename  }) => {
  const metaDescription = "Idris Book Bank nurturing creativity and innovation by offering design-minded and interdisciplinary events, experiences and objects related to books and reading."
  sitename=process.env.NEXT_PUBLIC_COMPANY_NAME
  return (
    <Head>
    
      <title>
        {title} | {sitename}
      </title>
      <meta name="title" content={metaTitle?metaTitle+" - "+title:"Buy Products Online - Ecommerce"} />
      <meta name="description" content={description?description:metaDescription} />
      
    </Head>
  );
};

export default SEO;