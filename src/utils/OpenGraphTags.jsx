import React from "react";

const OpenGraphTags = () => {
  return (
    <React.Fragment>
      <meta
        property="og:url"
        content="https://idrisbookbank.com"
      />
      {/* thumbnail And title for social media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Idris Book Bank | Online Book Store" />
      <meta
        property="og:description"
        content="Navigate through our wide collection of School, Colleges and other Story Books. Buy Books & other items Online from largest bookstore in Islamabad. Order Now!"
      />
      <meta property="og:image" content="https://s3-inara.eu-central-1.linodeobjects.com/idris/logo/image-preview.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Idris Book Bank | Online Book Store" />
      <meta name="twitter:description" content="Navigate through our wide collection of School, Colleges and other Story Books. Buy Books & other items Online from largest bookstore in Islamabad. Order Now!" />
      <meta name="twitter:image" content="https://s3-inara.eu-central-1.linodeobjects.com/idris/logo/image-preview.png" />
    </React.Fragment>
  );
};

export default OpenGraphTags;
