import { apiPost } from "./api";

export const handleFileUpload = async (value?: File) => {
  if (!value) return;

  const formData = new FormData();
  formData.append("file", value);

  try {
    const res = await apiPost("/api/entry/upload", formData);
    return res;
  } catch (e) {
    console.error("File upload failed:", e);
  }
};
