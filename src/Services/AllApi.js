import base_url from "./base_url";
import commonApi from "./commonApi";



export const registerApi = async (data) => {

    return await commonApi(`${base_url}/register`,"POST","", data)

}
export const loginApi = async (data) => {

    return await commonApi(`${base_url}/login`,"POST","",data)
}
export const getUsersApi = async () => {

    return await commonApi(`${base_url}/getuser`,"GET","")
}


export const addProductApi = async (data) => {
  
    return await commonApi(`${base_url}/addproduct`,"POST","",data)

}
export const getProductApi = async () => {
    

    return await commonApi(`${base_url}/getproducts`,"GET","")

}
export const addOrderApi = async (data) => {
     const header = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };
    return await commonApi(`${base_url}/createorder`,"POST",header,data)

}
export const getOrderApi = async () => {
     const header = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };
    return await commonApi(`${base_url}/getorders`,"GET",header)

}
export const getAllOrderApi = async () => {
     
    return await commonApi(`${base_url}/getallorders`,"GET")

}

export const addtoCartApi = async (data) => {
  return await commonApi(
    `${base_url}/addtocart`,
    "POST",
    {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data
  );
};

export const reduceCartApi = async (data) => {
  return await commonApi(
    `${base_url}/reducecart`,
    "POST",
    {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data
  );
};

export const getCartApi = async () => {
  return await commonApi(
    `${base_url}/getcart`,
    "GET",
    {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    }
  );
};

export const deleteCartApi = async (id) => {
  return await commonApi(
    `${base_url}/removeitem/${id}`,
    "DELETE",
    {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    }
  );
};
