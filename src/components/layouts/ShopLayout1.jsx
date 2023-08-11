import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import MobileNavigationBar from "components/mobile-navigation/MobileNavigationBar";
import Sticky from "components/sticky/Sticky";
import Topbar from "components/topbar/Topbar";
import React, { Fragment, useCallback, useState } from "react";
import Navbar from "components/navbar/Navbar";
import useSWR from 'swr'
import axios from 'axios';


/**
 *  Used in:
 *  1. market-1, matket-2, gadget-shop,
 *     fashion-shop, fashion-shop-2, fashion-shop-3, furniture-shop, grocery3, gift-shop
 *  2. product details page
 *  3. order-confirmation page
 *  4. product-search page
 *  5. shops and shops-details page
 *  6. checkoutNavLayout and CustomerDashboadLayout component
 */
// ===================================================

// ===================================================
const ShopLayout1 = ({
  children,
  showTopbar = true,
  topbarBgColor,
  showNavbar = true,
  navCategories,
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const server_ip = process.env.NEXT_PUBLIC_BACKEND_API_BASE;
  const { data, error } = useSWR(server_ip + 'getFooterSettings', fetcher);
  const { data: data1, error: error1 } = useSWR(server_ip + 'getGeneralSetting', fetcher);



  return (
    <Fragment>
      {/* TOPBAR */}
      {showTopbar && <Topbar bgColor={topbarBgColor} topbardata={data1 && data1.length > 0 ? data1 : null} />}

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
      <Header isFixed={isFixed} headerdata={data1 && data1.length > 0 ? data1 : null} />
      </Sticky>

      <div className="section-after-sticky">
        {/* NAVIGATION BAR */}
        {showNavbar && <Navbar elevation={0} border={1} navCategories={navCategories} />}

        {/* BODY CONTENT */}
        {children}
      </div>

      <MobileNavigationBar />

      <Footer footerData={data && Object.keys(data).length > 0 ? data : null} />
    </Fragment>
  );
};

export default ShopLayout1;


