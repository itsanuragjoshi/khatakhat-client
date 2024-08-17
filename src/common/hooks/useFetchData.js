import { useState, useEffect, useCallback } from "react";
import { axiosPublic, axiosAuthN, axiosAuthZ } from "../../api/axios";

const useFetchData = (url, params = {}, level = "public") => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (signal) => {
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
      setError(null);

      try {
        const response = await axiosInstance.get(url, {
          params,
          signal,
        });
        setData(response.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [url, JSON.stringify(params), level]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useFetchData;
