// src/context/GlobalStateContext.js
import React, { createContext, useState } from 'react';
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(advancedFormat); //https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(isoWeek);

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    data_catalog: null,
    data_choosen: null,
    update: 0,
    isServerAvailable: false,
    isRecipeAvailable: false,
    selectedDate: dayjs().format("YYYY-MM-DD"),
  });

  // Function to update the global data
  const updateGlobalData = (new_catalog,new_choosen) => {
    setGlobalState((prevState) => ({
      ...prevState,
      data_catalog: new_catalog,
      data_choosen: new_choosen
    }));
  };

  const updateServerHealth = (Health) => {
    setGlobalState((prevState) => ({
        ...prevState,
        isServerAvailable: Health,
    }));
  };

  const updateRecipeAvailable = (isRecipe) => {
    setGlobalState((prevState) => ({
        ...prevState,
        isRecipeAvailable: isRecipe,
    }));
    return 
  };

  const updateSelectedDate = (date) => {
    setGlobalState((prevState) => ({
        ...prevState,
        selectedDate: date,
    }));
  };

  // Function to trigger a forced update (re-fetch)
  const forceUpdate = () => {
    setGlobalState((prevState) => ({
      ...prevState,
      update: prevState.update + 1,
    }));
  };

  return (
    <GlobalStateContext.Provider value={{ globalState, updateGlobalData, forceUpdate, updateServerHealth, 
    updateRecipeAvailable, updateSelectedDate }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
