import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShopLayout1 from "components/layouts/ShopLayout1";
import SEO from "components/SEO";
import Setting from "components/Setting";
import Section1 from "pages-sections/market-2/Section1";
import Section2 from "pages-sections/market-2/Section2";
import Section3 from "pages-sections/market-2/Section3";
import Section4 from "pages-sections/market-2/Section4";
import Section5 from "pages-sections/market-2/Section5";
import Section6 from "pages-sections/market-2/Section6";
import Section7 from "pages-sections/market-2/Section7";
import Section9 from "pages-sections/market-2/Section9";
import Section10 from "pages-sections/market-2/Section10";
import Section12 from "pages-sections/market-2/Section12";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import apiNav from "utils/api/market-2";
import api from "utils/api/fashion-shop-2";

const IndexPage = (props) => {

const GeneralSetting=props.GeneralSetting

  // const { data: session } = useSession();
  const { data: session, status } = useSession();
  const { navCategories } = props;
  const [Wishlistdata, setWishlistdata] = useState(undefined);

  if (
    session !== undefined &&
    Wishlistdata === undefined &&
    status === "authenticated"
  ) {
    const data = ["4783"];

    setWishlistdata(data);
  }

  const theme = useTheme();

  return (
    <ShopLayout1
      topbarBgColor={theme.palette.grey[900]}
      navCategories={navCategories}
    >
      <SEO
        title={GeneralSetting&&GeneralSetting.length>0?GeneralSetting[0].site_name:'Ecommerce Online Store'       }
        description={GeneralSetting&&GeneralSetting.length>0?GeneralSetting[0].site_description:'Ecommerce Online Store'       }
         metaTitle={GeneralSetting&&GeneralSetting.length>0?GeneralSetting[0].site_metatitle:'Ecommerce Online Store'       }
         
         />
      <Box bgcolor="#F6F6F6">
        <Section1
          data1={props.Section1SequenceData}
          data2={props.Section1SequenceData2 || []}
          slidersList={props.slidersList}
          slidersListLocal={props.slidersListLocal}
        />

        <Section9 data={props.ProductReviews} />
        <Box sx={{ my: -7 }}>
          <Section3
            data1={props.Section2SequenceData || []}
            data2={props.Section2SequenceData2 || []}
            data3={props.Section2SequenceData3 || []}
            data4={props.Section2SequenceData4 || []}
            data5={props.Section2SequenceData5 || []}
            data6={props.Section2SequenceData6 || []}
          />
        </Box>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Section2 data={props.brandbundles || []} />
        </Box>
        <Box sx={{ my: -12 }}>
          <Section4
            data1={props.Section3SequenceData || []}
            data2={props.Section3SequenceData2 || []}
            data3={props.Section3SequenceData3 || []}
            userWishlist={Wishlistdata || []}
          />
        </Box>
        <Box sx={{ mt: 5 }}>
          <Section5
            products={props.products || []}
            data={props.SectionSequenceOrdera || []}
            SectionName={props.Section1Name || ""}
            slug={props.slug || ""}
            productreviews={props.ProductReviews} 

          />
        </Box>
        <Box sx={{ my: -7 }}>
          <Section6
            data1={props.Section4SequenceData || []}
            data2={props.Section4SequenceData2 || []}
          />
        </Box>
        <Section12
          products={props.product || []}
          data={props.SectionSequenceOrdera2 || []}
          Section2Name={props.Section2Name || ""}
          slug={props.slug2 || ""}
          productreviews={props.ProductReviews} 

        />
        {props.productbundles.length > 0 && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Section10 data={props.productbundles} />
          </Box>
        )}

        <Box sx={{ my: -4 }}>
          <Section7 data1={props.Section5SequenceData || []} />
        </Box>
        {/* <Section13 products={props.sect13products || []} /> */}
        {/* <Section8 /> */}
      </Box>

      {/* <Setting /> */}
    </ShopLayout1>
  );
};

export async function getServerSideProps(context) {
  // const { data: session } = useSession();
  const navCategories = await apiNav.getNavCategories();
  const sect4products = await api.getProducts();

  const inara = await api.getProducts();
  // const bundles=await api.getBundles();
  const brandbundles = await api.getBrandBundles();
  const productbundles = await api.getProductBundles();

  // const latestproduct=await api.getLatestProducts();

  // const featureProducts = await api.getFeatureProducts();
  const individulorder = await api.getindvidualorderbox();
  const sectionsequenceorder = await api.getSectionSequence();

  // Get Sliders Api
  const slidersList = await api.getSlidersFromCloud();
  const slidersListLocal = await api.getSlidersFromLocal();

  ////////////////////////Section 1/////////////////////////
  const Section1SequenceData = individulorder.find(
    (obj) => obj.sequenceNo == 1 && obj.type == "box"
  );


  const Section1SequenceData2 = individulorder.find(
    (obj) => obj.sequenceNo == 2 && obj.type == "box"
  );

  ////////////////////////Section 2/////////////////////////
  const Section2SequenceData = individulorder.find(
    (obj) => obj.sequenceNo == 3 && obj.type == "box"
  );

  const Section2SequenceData2 = individulorder.find(
    (obj) => obj.sequenceNo == 4 && obj.type == "box"
  );
  const Section2SequenceData3 = individulorder.find(
    (obj) => obj.sequenceNo == 5 && obj.type == "box"
  );
  const Section2SequenceData4 = individulorder.find(
    (obj) => obj.sequenceNo == 6 && obj.type == "box"
  );
  const Section2SequenceData5 = individulorder.find(
    (obj) => obj.sequenceNo == 7 && obj.type == "box"
  );
  const Section2SequenceData6 = individulorder.find(
    (obj) => obj.sequenceNo == 8 && obj.type == "box"
  );

  ////////////////////////Section 3/////////////////////////
  const Section3SequenceData = individulorder.find(
    (obj) => obj.sequenceNo == 9 && obj.type == "box"
  );
  const Section3SequenceData2 = individulorder.find(
    (obj) => obj.sequenceNo == 10 && obj.type == "box"
  );
  const Section3SequenceData3 = individulorder.find(
    (obj) => obj.sequenceNo == 11 && obj.type == "box"
  );
  ////////////////////////Section 4/////////////////////////
  const Section4SequenceData = individulorder.find(
    (obj) => obj.sequenceNo == 12 && obj.type == "box"
  );
  const Section4SequenceData2 = individulorder.find(
    (obj) => obj.sequenceNo == 13 && obj.type == "box"
  );
  ////////////////////////Section 5/////////////////////////
  const Section5SequenceData = individulorder.find(
    (obj) => obj.sequenceNo == 14 && obj.type == "box"
  );

  ////////////////////////Section Sequence Order 1/////////////////////////
  const SectionSequenceOrder = individulorder.find(
    (obj) => obj.type == "section" && obj.sequenceNo == 1
  );
  // const Section1Name=SectionSequenceOrder.category_name;
  const Section1Name = SectionSequenceOrder?.category_name || "";

  const SectionSequenceOrdera = individulorder.filter(
    (obj) =>
      obj.type == "section_subcategory" &&
      obj.parent == SectionSequenceOrder.category_id_id
  );

  ////////////////////////Section Sequence Order 2/////////////////////////

  const SectionSequence = individulorder.find(
    (ob) => ob.type == "section" && ob.sequenceNo == 2
  );
  // const Section2Name=SectionSequence.category_name || "";

  const Section2Name = SectionSequence?.category_name || "";

  const Section2id = SectionSequence?.category_id_id || "";

  const SectionSequenceOrdera2 = individulorder.filter(
    (os) => os.type == "section_subcategory" && os.parent == Section2id
  );

  // const SectionSequenceOrder=sectionsequenceorder.find(obj => obj.sequenceNo==1);

  const slug = SectionSequenceOrder?.category_slug || "";
  const slug2 = SectionSequence?.category_slug || "";

  const products = await api.getProducts(slug);
  const product = await api.getSectionProduct(slug2);
  const ProductReviews = await apiNav.getReviews();

  const GeneralSetting=await api.getGeneralSetting();

  ////////////////////////Section Sequence Order 2/////////////////////////

  // const products=sect4products;
  return {
    props: {
      navCategories,
      products,
      product,
      inara,
      sect4products,
      // latestproduct,
      SectionSequenceOrdera,
      Section1Name,
      Section2Name,
      SectionSequenceOrdera2,
      slug,
      slug2,
      // featureProducts,
      Section1SequenceData: Section1SequenceData || null,
      Section1SequenceData2: Section1SequenceData2 || null,
      Section2SequenceData: Section2SequenceData || null,
      Section2SequenceData2: Section2SequenceData2 || null,
      Section2SequenceData3: Section2SequenceData3 || null,
      Section2SequenceData4: Section2SequenceData4 || null,
      Section2SequenceData5: Section2SequenceData5 || null,
      Section2SequenceData6: Section2SequenceData6 || null,
      Section3SequenceData: Section3SequenceData || null,
      Section3SequenceData2: Section3SequenceData2 || null,
      Section3SequenceData3: Section3SequenceData3 || null,
      Section4SequenceData: Section4SequenceData || null,
      Section4SequenceData2: Section4SequenceData2 || null,
      Section5SequenceData: Section5SequenceData || null,
      individulorder,
      SectionSequenceOrder: SectionSequenceOrder || null,
      // bundles,
      brandbundles,
      productbundles,
      slidersList,
      slidersListLocal,
      ProductReviews,
      GeneralSetting
    },
  };
}

export default IndexPage;
