import { useState } from "react";
import { useRouter } from "next/router";

// antd
import { message } from "antd";

// services
import { mainService, handleAxiosErrorMessage } from "@/services";
import { apiLogin, apiLogout, apiMe, ApiLoginRequest } from "@/services/auth";

// cookies
import {
  getTokenCookie,
  setTokenCookie,
  deleteTokenCookie,
} from "@/cookies/auth";

export const useAuth = () => {
  // hooks
  const router = useRouter();

  // states
  const [logging, setLogging] = useState(false);

  const login = async (data: ApiLoginRequest) => {
    if (logging) return;

    setLogging(true);

    await apiLogin(data)
      .then((res) => {
        const token = res.data?.token;

        setTokenCookie(token);

        router.push("/");
      })
      .catch((err) => {
        message.error(handleAxiosErrorMessage(err));
      });

    setLogging(false);
  };

  const logout = async () => {
    await apiLogout()
      .then(() => {
        deleteTokenCookie();

        router.push("/login");
      })
      .catch((err) => {
        message.error(handleAxiosErrorMessage(err));
      });
  };

  return {
    logging,

    login,
    logout,
  };
};

export const serverGetMe = async ({ res, req }: any) => {
  const token = getTokenCookie({ res, req });

  mainService.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null;

  const user = token
    ? await apiMe()
        .then((res) => res.data)
        .catch(() => {
          deleteTokenCookie({ res, req });
          return null;
        })
    : null;

  return user;
};
