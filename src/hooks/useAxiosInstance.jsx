import React, { useEffect } from "react";
import { axiosInstance } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./UseRefreshToken";

const useAxiosInstance = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log("📛 Error status:", error.response?.status);
        console.log("📦 SENT?", prevRequest.sent);

        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(newAccessToken);

          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          console.log(
            "🛂 Header Authorization setelah refresh:",
            prevRequest.headers.Authorization
          );

          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [refresh, auth]);
  return axiosInstance;
};

export default useAxiosInstance;
