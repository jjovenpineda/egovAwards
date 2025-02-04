import axiosInstance from "./axiosInstance";

export const apiPost = async (url: string, data: object) => {
  try {
    const response = await axiosInstance.post(url, data);

    return response.data;
  } catch (e) {
    console.log("Post request failed:", e);
  }
};

export const apiGet = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (e) {
    console.log("Fetch request failed:", e);
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
