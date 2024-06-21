import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url, params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        return;
      }
      setLoading(true);
      setError(null); // Clear previous errors on each fetch

      try {
        const response = await axios.get(url, { params });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(params)]); // Refetch on URL, params, or trigger change

  return { data, loading, error };
};

export default useFetchData;
