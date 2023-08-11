import axios from "axios";
import useSWR from 'swr';

const getProducts = async (slug) => {
  const url = process.env.BACKEND_API_BASE+'getItemSearchCategory'
  if(slug!==undefined){

    const args = {'id':slug}
    let data = await axios.post(url,args).then((res) => res.data);
    return data
    
  }

  return null

};
const getSectionProduct = async (slug2) => {
  const url = process.env.BACKEND_API_BASE+'getItemSearchCategory'
  if(slug2!==undefined){

    const args = {'id':slug2}
    let data = await axios.post(url,args).then((res) => res.data);
    return data
    
  }
  return null
};



const GetWishlist = async () => {
    const fetcher =(url)=>axios.get(url,{headers: {Authorization: `Bearer ${session.accessToken}`}}).then(response=>response.data)
    const { data, error } = useSWR(process.env.BACKEND_API_BASE+'getWishlist', fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
  };

const getindvidualorderbox = async () => {
  const response = await axios.get(process.env.BACKEND_API_BASE+"webind");
  return response.data;
};

const getSectionSequence = async () => {
  const response = await axios.get(process.env.BACKEND_API_BASE+"getsection");
  return response.data;
};

const getLatestProducts = async () => {
 
  const response = await axios.get(process.env.BACKEND_API_BASE+"getFearuredProduct");
  return response.data;
};

const getBundles = async () => {
 
  const response = await axios.get(process.env.BACKEND_API_BASE+"getBundels");
  return response.data;
};


const getBrandBundles = async () => {
 
  const response = await axios.get(process.env.BACKEND_API_BASE+"getBrandBundels");

  return response.data;
};

const getProductBundles = async () => {
 
  const response = await axios.get(process.env.BACKEND_API_BASE+"getProductBundels");

  return response.data;
};

const getSlidersFromCloud = async () => {
 
  const response = await axios.get(process.env.BACKEND_API_BASE+"getSlidersFromCloud");

  return response.data;
};
const getSlidersFromLocal = async () => {
 
  const response = await axios.get(process.env.BACKEND_API_BASE+"getsliderimage");

  return response.data;
};

const getFooterItem = async () => {
 
  const response = await axios.get(process.env.BACKEND_API_BASE+"getFooterSettings");

  return response.data;
};

const getGeneralSetting = async () => {
 
  const response = await axios.get(process.env.BACKEND_API_BASE+"getGeneralSetting");

  return response.data;
};



// const getFeatureProducts = async () => {
//   const response = await axios.get("/api/fashion-shop-2/feature-products");
//   return response.data;
// };

// const getSaleProducts = async () => {
//   const response = await axios.get("/api/fashion-shop-2/sale-products");
//   return response.data;
// };

// const getPopularProducts = async () => {
//   const response = await axios.get("/api/fashion-shop-2/popular-products");
//   return response.data;
// };



// const getBestWeekProducts = async () => {
//   const response = await axios.get("/api/fashion-shop-2/best-week-products");
//   return response.data;
// };

// const getBlogs = async () => {
//   const response = await axios.get("/api/fashion-shop-2/blogs");
//   return response.data;
// }; // eslint-disable-next-line import/no-anonymous-default-export

export default {
  // getBlogs,
  getProducts,

  getBundles,
  getBrandBundles,
  getSectionProduct,
  getProductBundles,
  getLatestProducts,
  // getFeatureProducts,
  // getPopularProducts,
  // getBestWeekProducts,
  getindvidualorderbox,
  GetWishlist,
  getSectionSequence,
  getSlidersFromCloud,
  getSlidersFromLocal,
  getFooterItem,
  getGeneralSetting,
};
