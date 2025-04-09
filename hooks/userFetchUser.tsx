import { apiGet } from "@/utils/api";
import { getUserInfo } from "@/utils/utility";

const useFetchUser = async () => {
  const setUserInfo;
  try {
    const { _id } = getUserInfo();
    const res = await apiGet(`/api/auth/fetch/user/${_id}`);
    const { data } = res;
    if (!data) return;
    setUserInfo(data);
    if (data?.isAdminUser) {
      deleteCookie("authToken");
      storage.removeAll();
      router.push("/sign-in");
    }
    if (
      data.authRep.isNewAccount &&
      !window.location.pathname.includes("settings")
    ) {
      window.location.href = "/settings";
    }
  } catch (e) {
    console.error("Error fetching LGU list:", e);
  }
};
