// services
import { mainService } from "@/services";

export type ApiLoginRequest = {
  email: string;
  password: string;
};

export type ApiLoginResponse = {
  type: "bearer";
  token: string;
  expires_at: string;
};

export type ApiLogoutResponse = {
  revoked: boolean;
};

export type ApiMeResponse = {
  id: number;
  email: string;
  remember_me_token: null;
  created_at: string;
  updated_at: string;
};

export const apiLogin = (data: ApiLoginRequest) => {
  return mainService.request({
    method: "POST",
    url: "/auth/login",
    data,
  });
};

export const apiLogout = () => {
  return mainService.request({
    method: "POST",
    url: "/auth/logout",
  });
};

export const apiMe = () => {
  return mainService.request({
    method: "GET",
    url: "/auth/me",
  });
};
