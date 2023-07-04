import axios, { AxiosError } from "axios";

// cookies
import { getTokenCookie } from "@/cookies/auth";

export const mainService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

// Add a request interceptor
mainService.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getTokenCookie();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
mainService.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const errorMessage = handleAxiosErrorMessage(error);
    if (errorMessage === "E_UNAUTHORIZED_ACCESS: Unauthorized access") {
      alert("Session timeout");
      window.location.replace(`${window.location.origin}/login`);
    }

    return Promise.reject(error);
  }
);

export const handleAxiosErrorMessage = (err: AxiosError<any>) => {
  let message = null;

  if (err.response) {
    if (err.response.data?.errors) {
      message = err.response.data?.errors?.[0]?.message;
    } else {
      message = err.response.data?.message;
    }
  } else if (err.request) {
    message = "no response from server";
  } else {
    message = err.message;
  }

  return message;
};
