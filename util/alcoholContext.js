import { createContext, useState } from "react";

export const AlcoholContext = createContext({
  alcoholName: "",
  updateAlcoholName: () => { },
});

function AlcoholContextProvider({ children }) {
  const [alcohol, setAlcohol] = useState("Vodka");

  function updateAlcoholName(name) {
    setAlcohol(name);
  }

  const value = {
    alcoholName: alcohol,
    updateAlcoholName: updateAlcoholName,
  };

  return (
    <AlcoholContext.Provider value={value}>{children}</AlcoholContext.Provider>
  );
}

export default AlcoholContextProvider;
