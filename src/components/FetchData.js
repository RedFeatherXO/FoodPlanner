import { useContext,useEffect, useState, useCallback } from "react";
import { GlobalStateContext } from '../context/GlobalStateContext';
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);

export function useFetchData(url, pollingInterval = 50000, healthPollingInterval = 5000, recipePollingInterval = 1000) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { globalState, updateGlobalData, updateServerHealth, updateRecipeAvailable  } = useContext(GlobalStateContext);
  // Server status check
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch("/api/health");
        updateServerHealth(response.ok);
      } catch (error) {
        updateServerHealth(false);
      }
    };
    
    checkServerStatus();
    const intervalId = setInterval(checkServerStatus, healthPollingInterval);
    return () => clearInterval(intervalId);
  }, [healthPollingInterval]);

  // Function to fetch data
  const fetchData = useCallback(async () => {
    if (!globalState.isServerAvailable) return;
    setIsLoading(true);
    try {
      const query = `?name=dev`;
      const response_choosen = await fetch(`/api/Test2${query}`);
      const response_catalog = await fetch(`/api/GetRecipeCatalog`)
      if (!response_catalog.ok) {
        throw new Error(`HTTP error! status: ${response_catalog.status}`);
      }

      if (!response_choosen.ok) {
        throw new Error(`HTTP error! status: ${response_choosen.status}`);
      }
      const result_catalog = await response_catalog.json();
      const result_choosen = await response_choosen.json();
      
      setError(null);
      if (globalState.result_catalog !== result_catalog && globalState.result_choosen !== result_choosen) {
        updateGlobalData(result_catalog,result_choosen);  // Call updateGlobalState only when needed
      }
      
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }, [globalState.isServerAvailable, url, globalState.update,globalState.isRecipeAvailable]);

  const updateIsRecipeAvailable = useCallback(() => {
    if (globalState.data_choosen && globalState.data_choosen.ausgewählteRezepte) {
      const data = globalState.data_choosen;
      let found = false;
      for (const element of data.ausgewählteRezepte) {
        if (element.datum === dayjs(globalState.selectedDate).format("YYYY-MM-DD")) {
          if (!globalState.isRecipeAvailable) {
            updateRecipeAvailable(true); // Nur aktualisieren, wenn der Status sich wirklich ändert
          }
          found = true;
          break;
        }
      }
      if (!found && globalState.isRecipeAvailable) {
        updateRecipeAvailable(false); // Nur aktualisieren, wenn der Status sich wirklich ändert
      }
    } else {
      if (globalState.isRecipeAvailable) {
        updateRecipeAvailable(false); // Nur aktualisieren, wenn der Status sich wirklich ändert
      }
    }
  }, [globalState.data_choosen, globalState.selectedDate, globalState.isRecipeAvailable]); // Richtige Abhängigkeiten angeben
  
  // Automatic polling
  useEffect(() => {
    if (globalState.isServerAvailable) {
      updateIsRecipeAvailable(); // Initiales Update
      const intervalId = setInterval(updateIsRecipeAvailable, recipePollingInterval);
      return () => clearInterval(intervalId);
    }
  }, [globalState.isServerAvailable, updateIsRecipeAvailable, recipePollingInterval]);
  

  // Automatic polling
  useEffect(() => {
    if (globalState.isServerAvailable) {
      fetchData();
      const intervalId = setInterval(fetchData, pollingInterval);
      return () => clearInterval(intervalId);
    }
  }, [globalState.isServerAvailable, fetchData, pollingInterval]);

  return { error, isLoading, refetch: fetchData };
}