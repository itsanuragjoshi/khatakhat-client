import { useState, useEffect } from "react";
import { axiosPrivate } from "../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/slices/loadingSlice";

const useFetchData = (url, params = {}) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const isLoading = useSelector((state) => state.loading.fetchData);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        return;
      }
      dispatch(startLoading("fetchData"));
      setError(null); // Clear previous errors on each fetch

      try {
        const response = await axiosPrivate.get(url, { params });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        dispatch(stopLoading("fetchData"));
      }
    };

    fetchData();
  }, [url, JSON.stringify(params), dispatch]);

  return { data, isLoading, error };
};

export default useFetchData;
