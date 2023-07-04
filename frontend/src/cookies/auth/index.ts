import { setCookie, getCookie, deleteCookie } from "cookies-next";

const TOKEN_NAME = "token";

export const setTokenCookie = (token: string, options?: any) => {
  setCookie(TOKEN_NAME, token, options);
};

export const getTokenCookie = (options?: any) => {
  return getCookie(TOKEN_NAME, options);
};

export const deleteTokenCookie = (options?: any) => {
  deleteCookie(TOKEN_NAME, options);
};
