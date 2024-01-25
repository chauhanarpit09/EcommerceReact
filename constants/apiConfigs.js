import axios from "axios";
const apiRoute =
  "https://20ca-2409-40f2-104b-51bb-18bd-b5dc-a49a-f18d.ngrok-free.app";

const sendOtp = async (userName, phone, email) => {
  try {
    const request = { userName, phone, email, role: "USER" };
    const response = await axios.post(`${apiRoute}/auth/register`, request);
    return response && response.data;
  } catch (error) {
    console.error(error);
    console.error("Error sending POST request:", error.response.data);
    return error.response && error.response.data;
  }
};

const verifyOtp = async (userName, email, phone, otp, token, isNewUser) => {
  try {
    const request = { userName, email, phone, otp, isNewUser, role: "USER" };
    const headers = {
      Authorization: token,
      "content-type": "application/json",
    };
    const response = await axios.post(`${apiRoute}/auth/verify`, request, {
      headers,
    });
    console.log("\n\n response=>", response);
    console.log(response.data);
    return response && response.data;
  } catch (error) {
    console.error(error);
    console.error("Error sending POST request:", error.response.data);
    return error.response && error.response.data;
  }
};

const forgotPass = async (email, phone) => {
  try {
    const request = { email, phone };
    const response = await axios.post(`${apiRoute}/forgotPassword`, request);
    console.log("\n\n response=>", response);
    console.log(response.data);
    return response && response.data;
  } catch (error) {
    console.error("Error sending POST request:", error.response.data);
    return error.response && error.response.data;
  }
};

const upatePassword = async (password, token) => {
  try {
    const request = { password };
    const headers = {
      Authorization: token,
      "content-type": "application/json",
    };
    const response = await axios.post(
      `${apiRoute}/auth/updatepassword`,
      request,
      {
        headers,
      }
    );
    console.log("\n\n response=>", response);
    console.log(response.data);
    return response && response.data;
  } catch (error) {
    console.error("Error sending POST request:", error.response.data);
    return error.response && error.response.data;
  }
};

const login = async (email, phone, password) => {
  try {
    const request = { email, phone, password };
    const response = await axios.post(`${apiRoute}/auth/login`, request);
    console.log("\n\n response=>", response);
    console.log(response.data);
    return response && response.data;
  } catch (error) {
    console.error("Error sending POST request:", error.response.data);
    return error.response && error.response.data;
  }
};

/************************************   SEARCH  ****************************************************************************/

const search = async (searchText) => {
  try {
    const response = await axios.get(
      `${apiRoute}/elastic/search?query=${searchText}`
    );
    console.log("\n\n response=>", response);
    console.log(response.data);
    return response && response.data;
  } catch (error) {
    console.error("Error", error);
    return error.response && error.response.data;
  }
};

/************************************   CART  ****************************************************************************/

const getCartDetail = async (token) => {
  try {
    const headers = {
      Authorization: token,
      "content-type": "application/json",
    };
    const response = await axios.get(`${apiRoute}/cart/get`, { headers });
    console.log("\n\n response=>", response);
    console.log(response.data);
    return response && response.data;
  } catch (error) {
    console.error("Error", error);
    return error.response && error.response.data;
  }
};

const updateCart = async (token, item, quantity) => {
  try {
    const request = {
      productId: item._id || item.id,
      vendorId: item.vendor,
      quantity,
    };
    console.log(request);
    const headers = {
      Authorization: token,
      "content-type": "application/json",
    };
    const response = await axios.post(`${apiRoute}/cart/update`, request, {
      headers,
    });
    console.log("\n\n response=>", response);
    console.log(response.data);
    return response && response.data;
  } catch (error) {
    console.error("Error", error.response);
    return error.response && error.response.data;
  }
};

const deleteItemFromCart = async (token, item) => {
  try {
    const request = {
      productId: item._id || item.id,
    };
    const headers = {
      Authorization: token,
      "content-type": "application/json",
    };
    const response = await axios.post(`${apiRoute}/cart/delete`, request, {
      headers,
    });
    console.log("\n\n response=>", response);
    console.log(response.data);
    return response && response.data;
  } catch (error) {
    console.error("Error", error.response);
    return error.response && error.response.data;
  }
};

const deleteAllItemFromCart = async (token) => {
  try {
    const headers = {
      Authorization: token,
      "content-type": "application/json",
    };
    const response = await axios.post(`${apiRoute}/cart/deleteall`, {
      headers,
    });
    console.log("\n\n response=>", response);
    console.log(response.data);
    return response && response.data;
  } catch (error) {
    console.error("Error", error.response);
    return error.response && error.response.data;
  }
};

export {
  sendOtp,
  verifyOtp,
  forgotPass,
  upatePassword,
  login,
  search,
  getCartDetail,
  updateCart,
  deleteItemFromCart,
  deleteAllItemFromCart,
};
