import { useState, useEffect } from "react";
import { axiosPublic, axiosAuthN, axiosAuthZ } from "../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/slices/loadingSlice";

const useFetchData = (url, params = {}, level = "public") => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const isLoading = useSelector((state) => state.loading.fetchData);

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
      dispatch(startLoading("fetchData"));
      setError(null); // Clear previous errors on each fetch

      try {
        const response = await axiosInstance.get(url, { params });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        dispatch(stopLoading("fetchData"));
      }
    };

    fetchData();
  }, [url, JSON.stringify(params), dispatch, level]);

  return { data, isLoading, error };
};

export default useFetchData;
