import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import useSWR, { Fetcher } from "swr";

// antd
import { message } from "antd";

// services
import {
  // mainService,
  handleAxiosErrorMessage,
} from "@/services";
import {
  apiLogin,
  apiLogout,
  apiMe,
  ApiLoginRequest,
  // ApiMeResponse,
} from "@/services/auth";

// cookies
import // getTokenCookie,
// setTokenCookie,
// deleteTokenCookie,
"@/cookies/auth";

// storages
import {
  getTokenStorage,
  setTokenStorage,
  deleteTokenStorage,
} from "@/storages/auth";

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

        // setTokenCookie(token);
        setTokenStorage(token);

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
        // deleteTokenCookie();
        deleteTokenStorage();

        router.push("/login");
      })
      .catch((err) => {
        message.error(handleAxiosErrorMessage(err));
      });
  };

  const getMe = async () => {
    const token = getTokenStorage();

    const user = token
      ? await apiMe()
          .then((res) => res.data)
          .catch(() => {
            deleteTokenStorage();
            return null;
          })
      : null;

    return user;
  };

  return {
    logging,

    login,
    logout,
    getMe,
  };
};

export const useMe = () => {
  // hooks
  const router = useRouter();

  // states
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    apiMe()
      .then((res) => setUser(res.data))
      .catch(() => null)
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (!user) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, user]);

  return {
    user,
    isReady,
  };
};

// export const serverGetMe = async ({ res, req }: any) => {
//   const token = getTokenCookie({ res, req });

//   mainService.defaults.headers.common["Authorization"] = token
//     ? `Bearer ${token}`
//     : null;

//   const user = token
//     ? await apiMe()
//         .then((res) => res.data)
//         .catch(() => {
//           deleteTokenCookie({ res, req });
//           return null;
//         })
//     : null;

//   return user;
// };
