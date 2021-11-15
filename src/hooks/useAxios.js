import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (request) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reque, setReque] = useState(true);
  const { method, url } = request;

  const axiosCallback = async () => {
    setLoading(true);
    try {
      let resData = await axios[method](url);
      setData([...data, resData.data].flat());
    } catch (err) {
      console.log(err);
      setError(err.message.data);
    } finally {
      setLoading(false);
      setReque(false);
    }
  };

  const handleReque = () => {
    setReque(!reque);
  };

  useEffect(() => {
    if (reque) {
      axiosCallback();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reque]);
  return [{ data, loading, error }, handleReque];
};
export default useAxios;
