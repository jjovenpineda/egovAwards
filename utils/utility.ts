import CryptoJS from "crypto-js";
import { config } from "./config";
import { storage } from "./useStorage";
export const encrypt = (text: any) => {
  try {
    const _text = typeof text === "object" ? JSON.stringify(text) : text;
    const encryptedText = CryptoJS.AES.encrypt(_text, config.secret).toString();
    return encryptedText;
  } catch (e) {
    console.error("Encryption failed:", e);
    return null;
  }
};

export const decrypt = (text: string) => {
  if (text) {
    const bytes = CryptoJS.AES.decrypt(text, config.secret);

    try {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch {
      return bytes.toString(CryptoJS.enc.Utf8);
    }
  }
};

export const tokenValue = () => {
  const account = storage.getItem("account_data");
  if (account) {
    const _account = decrypt(account);
    if (_account) {
      return _account.accessToken;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const getUserInfo = () => {
  const account = storage.getItem("account_data");
  if (account) {
    const _account = decrypt(account);
    if (_account) {
      return _account;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
};
export const setCookie = (name: string, value: string, days = 1) => {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; secure`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
