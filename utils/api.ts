import axiosInstance from "./axiosInstance";

export const apiPost = async (url: string, data: object, headers?: object) => {
  try {
    const response = await axiosInstance.post(url, data, headers);

    return response.data;
  } catch (e: any) {
    console.error("Error:", e);
    return e.response?.data ?? { success: false, message: "An error occurred" };
  }
};

export const apiGet = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (e: any) {
    console.log("Fetch request failed:", e);
    return e.response?.data ?? { success: false, message: "An error occurred" };
  }
};

export const apiPut = async <T>(url: string, data: T) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (e) {
    console.log("Update request failed:", e);
  }
};

export const apiDelete = async <T>(url: string, data: T) => {
  try {
    const response = await axiosInstance.delete(url, { data });
    return response.data;
  } catch (e) {
    console.log("Delete request failed:", e);
  }
};
