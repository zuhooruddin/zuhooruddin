import React from "react";

const GoogleAnalytics = () => {
  return (
    <React.Fragment>
      {/* Google analytics */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-FLCDXWTVMD"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FLCDXWTVMD');
          `,
        }}
      ></script>
    </React.Fragment>
  );
};

// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=UA-114925830-1"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'UA-114925830-1');
// </script>

export default GoogleAnalytics;
