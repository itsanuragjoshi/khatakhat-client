import { useState, useEffect } from "react";
import { axiosPublic, axiosAuthN, axiosAuthZ } from "../../api/axios";

const useFetchData = (url, params = {}, level = "public") => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        return;
      }

      let axiosInstance;
      switch (level) {
        case "authN":
          axiosInstance = axiosAuthN;
          break;
        case "authZ":
          axiosInstance = axiosAuthZ;
          break;
        case "public":
        default:
          axiosInstance = axiosPublic;
      }

      setIsLoading(true);
      setError(null); // Clear previous errors on each fetch

      try {
        const response = await axiosInstance.get(url, { params });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(params), level]);

  return { data, isLoading, error };
};

export default useFetchData;
