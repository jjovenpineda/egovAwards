import axiosInstance from "./axiosInstance";
import { storage } from "./useStorage";
import { deleteCookie } from "./utility";
const handleTokenError = () => {
  deleteCookie("authToken");
  storage.removeAll();
  window.location.href = "/sign-in";
};
export const apiPost = async (url: string, data: object) => {
  try {
    const response = await axiosInstance.post(url, data);

    return response.data;
  } catch (e: any) {
    console.error("Post Request Failed:", e);
    const errorResponse = e.response?.data ?? {
      success: false,
      message: "An error occurred",
    };

    if (errorResponse.res_code === "TokenError") {
      handleTokenError();
    }

    return errorResponse;
  }
};

export const apiGet = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (e: any) {
    console.error("Fetch Request Failed:", e);
    const errorResponse = e.response?.data ?? {
      success: false,
      message: "An error occurred",
    };

    if (errorResponse.res_code === "TokenError") {
      handleTokenError();
    }

    return errorResponse;
  }
};

export const apiPut = async <T>(url: string, data: T) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (e: any) {
    console.error("Update Request Failed:", e);
    const errorResponse = e.response?.data ?? {
      success: false,
      message: "An error occurred",
    };

    if (errorResponse.res_code === "TokenError") {
      handleTokenError();
    }

    return errorResponse;
  }
};

export const apiDelete = async <T>(url: string, data: T) => {
  try {
    const response = await axiosInstance.delete(url, { data });
    return response.data;
  } catch (e: any) {
    console.error("Delete Request Failed:", e);
    const errorResponse = e.response?.data ?? {
      success: false,
      message: "An error occurred",
    };

    if (errorResponse.res_code === "TokenError") {
      handleTokenError();
    }

    return errorResponse;
  }
};
