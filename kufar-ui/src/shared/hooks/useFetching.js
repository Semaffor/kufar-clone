import {useState} from "react";

export const useFetching = (callback) => {
  const [isLoading, setLoadingStatus] = useState(false)
  const [error, setError] = useState('false')

  const fetching = async (...args) => {
    try {
      setLoadingStatus(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingStatus(false);
    }
  }

  return [fetching, isLoading, error];
}