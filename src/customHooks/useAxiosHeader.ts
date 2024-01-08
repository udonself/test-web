import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const useAxiosHeader = () => {
  const [header, setHeader] = useState<null | AxiosRequestConfig["headers"]>(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setHeader({ Authorization: `Bearer ${token}` });
    }
  }, []);

  return header;
};

export default useAxiosHeader;