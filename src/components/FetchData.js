import { useContext,useEffect, useState, useCallback } from "react";
import { GlobalStateContext } from '../context/GlobalStateContext';

export function useFetchData(url, pollingInterval = 50000, healthPollingInterval = 5000) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isServerAvailable, setIsServerAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { globalState, setGlobalState } = useContext(GlobalStateContext);

  // Server status check
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch("/api/health");
        setIsServerAvailable(response.ok);
      } catch (error) {
        setIsServerAvailable(false);
      }
    };
    
    checkServerStatus();
    const intervalId = setInterval(checkServerStatus, healthPollingInterval);
    return () => clearInterval(intervalId);
  }, [healthPollingInterval]);

  // Function to fetch data
  const fetchData = useCallback(async () => {
    if (!isServerAvailable) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }, [isServerAvailable, url, globalState.update]);

  // Automatic polling
  useEffect(() => {
    if (isServerAvailable) {
      fetchData();
      const intervalId = setInterval(fetchData, pollingInterval);
      return () => clearInterval(intervalId);
    }
  }, [isServerAvailable, fetchData, pollingInterval]);

  return { data, error, isServerAvailable, isLoading, refetch: fetchData };
}