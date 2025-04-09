import { toast } from "@/hooks/use-toast";
import { apiPost } from "./api";

export const handleFileUpload = async (event: any, setValue?: Function) => {
  if (!event) return;
  const file = event.target.files[0];
  const size = event.target.files?.[0]?.size;
  if (size) {
    if (size > 3 * 1024 * 1024) {
      toast({
        title: "File too large!",
        description: "Please upload a file smaller than 3MB.",
        variant: "destructive",
        duration: 2500,
      });
      return;
    } else {
      if (file) {
        setValue && setValue();
        const formData = new FormData();
        formData.append("file", file);

        try {
          const { data } = await apiPost("/api/entry/upload", formData);
          return data;
        } catch (e) {
          console.error("File upload failed:", e);
        }
      }
    }
  }
};
