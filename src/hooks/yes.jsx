import { axiosInstance } from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axiosInstance.get("/users/refresh");

      setAuth((prev) => {
        return { ...prev, accessToken: response.data.accessToken };
      });
      return response.data.accessToken;
    } catch (error) {
      throw new Error(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
