import axios from "axios";
// import {server_ip} from "../backend_server_ip.jsx"
const server_ip = process.env.NEXT_PUBLIC_BACKEND_API_BASE;

// Used 
const getNavCategories = async () => {
  const response = await axios.get(server_ip+"getNavCategories");
  return response.data;
};
// Used 
const getCategoryDetail = async (catSlug) => {
  
  const response = await  axios({
    method: 'get',
    url: server_ip+'getCategoryDetail',
    data: {
      slug: catSlug
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

return response.data;
};

// Used 
const getItemDetail = async (slug) => {
  const response = await  axios({
    method: 'get',
    url: server_ip+'getItemDetail',
    data: {
      slug: slug
    }
  });
  return response.data;
};

const getSearchItem = async (slug) => {
  const response = await  axios({
    method: 'get',
    url: server_ip+'getSearchItem',
    data: {
      id: slug
    }
  });
  return response.data;
};

const getSearchCategory = async (catSlug) => {
  // const response = await axios.get("http://100.64.6.105:8099/getSearchItem");
  // return response.data;
  // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  // axios.defaults.xsrfCookieName = "csrftoken";
  const response = await  axios({
    method: 'get',
    url: server_ip+'getSearchCategory?slug='+catSlug+'',
    // data: {
    //   id: catSlug
    // },
    headers: {
      'Content-Type': 'application/json',
    },
  });

return response.data;
};


const getItem = async (itemId) => {
  const response = await  axios({
                          method: 'get',
                          url: server_ip+'getItem',
                          data: {
                            id: itemId
                          }
                        });
  return response.data;
};

const getBigDiscountList = async () => {
  const response = await axios.get("/api/market-1/big-discounts");
  return response.data;
}; // eslint-disable-next-line import/no-anonymous-default-export

const getProducts = async () => {
  // let data = axios.post('https://idrisbookbank-dev-server.inara.tech/getSearchCategory',{'id':'books'}).then(response=>response.data)
  const url = server_ip+'getSearchCategory?slug=books'
  // const args = {'id':'books'}
  let data = await axios.get(url).then((res) => res.data);
  
  
  return data
};
const myproduct = async () => {
  // let data = axios.post('https://idrisbookbank-dev-server.inara.tech/getSearchCategory',{'id':'books'}).then(response=>response.data)
  const url = server_ip+'getSearchCategory?slug=books'
  // const args = {'id':'books'}
  let data = await axios.get(url).then((res) => res.data);
  
  
  return data
};
const getProduct = async () => {
  // let data = axios.post('https://idrisbookbank-dev-server.inara.tech/getSearchCategory',{'id':'books'}).then(response=>response.data)
  const url = server_ip+'getSearchCategory?slug=stationery'
  // const args = {'id':'stationery'}
  let data = await axios.get(url).then((res) => res.data);
  
 
  return data
};
const getSearch = async () => {
  // let data = axios.post('https://idrisbookbank-dev-server.inara.tech/getSearchCategory',{'id':'books'}).then(response=>response.data)
  const url = server_ip+'search'
  // const args = {'id':'stationery'}
  let data = await axios.get(url).then((res) => res.data);
 
  return data
};

const addOrder = async (values,cartList,totalPrice,userid) => {
  const context = {}
  return axios({
                    method: 'post',
                    url: server_ip+'addOrder',
                    headers: {
                      // 'application/json' is the modern content-type for JSON, but some
                      // older servers may use 'text/json'.
                      // See: http://bit.ly/text-json
                      'content-type': 'application/json'
                    },
                    data: {

                      valueDict: values,
                      userid:userid,
                      cartList: cartList,
                      totalPrice:totalPrice,
                    }
                  });

  // return response.data
};

// Zuhoor Api 
const getAllProducts = async () => {
  // let data = axios.post('https://idrisbookbank-dev-server.inara.tech/getSearchCategory',{'id':'books'}).then(response=>response.data)
  const url = server_ip+'getAllItems'

  let data = await axios.get(url).then((res) => res.data);
  
  
  return data
};
const getbundleDetail = async (slug) => {
 
  return await  axios({
    method: 'get',
    url: server_ip+'getWebsiteBundlesForCategory?slug='+slug,
    
    data: {
      slug: slug
    }
  });
  
};
const getbundleitemDetail = async (slug) => {
 return await  axios({
    method: 'get',
    url: server_ip+'getWebsiteBundleItemDetails',
    data: {
      slug: slug
    }
  });
};
const getAllSchoolBundle = async (catSlug) => {
  const response = await  axios({
    method: 'get',
    url: server_ip+'getAllBrandBundle',
    data: {
      slug: catSlug
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
const getReviews= async () => {
  const response = await axios.get(server_ip+'getReviews');
  return response.data;
};
export default {
  getNavCategories,
  getItemDetail,
  getCategoryDetail,
  
  getProducts,
  getProduct,
  getBigDiscountList,
  getSearchItem,
  getSearchCategory,
  getItem,
  addOrder,
  // Zuhoor Api 
  getAllProducts,
  myproduct,
  getbundleDetail,
  getbundleitemDetail,
  getAllSchoolBundle,
  getSearch,
  getReviews,
};
