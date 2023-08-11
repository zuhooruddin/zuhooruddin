import RTL from "components/RTL";
import { AppProvider } from "contexts/AppContext";
import SettingsProvider from "contexts/SettingContext";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { Fragment, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import "simplebar/dist/simplebar.min.css";
import MuiTheme from "theme/MuiTheme";
import "../src/fake-db";
import {SessionProvider}  from "next-auth/react";
import { AuthenticationProvider } from '../context/AuthenticationContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useScrollRestoration from "../src/utils/useScrollRestoration";
import { FloatingWhatsApp } from 'react-floating-whatsapp'

//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done()); // small change

nProgress.configure({
  showSpinner: false,
});

const App = ({ router,Component, pageProps: { session, ...pageProps } }) => {
  const AnyComponent = Component;
  const idrisLogo = process.env.NEXT_PUBLIC_IDRIS_LOGO_API_URL

  const getLayout = AnyComponent.getLayout ?? ((page) => page);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  // useScrollRestoration(router);

  return (
    <SessionProvider session={session}>
            <AuthenticationProvider>

    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>Idris Book Bank | Online Bookstore</title>
        <meta
          name="description"
          content="Navigate through our wide collection of School, Colleges and other Story Books. Buy Books & other items Online from largest bookstore in Islamabad. Order Now!"
        />
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>  */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <FloatingWhatsApp
        phoneNumber="+923115567305"
        accountName="Idris Book Bank Support"
        avatar={idrisLogo}
        allowEsc
        allowClickAway
        notification
        notificationSound
      />

      <SettingsProvider>
        <AppProvider>
          <MuiTheme>
            <RTL>{getLayout(<AnyComponent {...pageProps} />)}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
            </RTL>
          </MuiTheme>
        </AppProvider>
      </SettingsProvider>
    </Fragment>
    </AuthenticationProvider>
    </SessionProvider>

  );
}; // Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps };
// };

export default App;
