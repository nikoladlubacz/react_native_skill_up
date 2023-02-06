import { createContext, useState } from "react";

export const AlkoholContext = createContext({
  alkoholName: "",
  updateAlkoholName: (name) => {},
});

function AlkoholContextProvider({ children }) {
  const [alkohol, setAlkohol] = useState("Vodka");

  function updateAlkoholName(name) {
    setAlkohol(name);
  }

  const value = {
    alkoholName: alkohol,
    updateAlkoholName: updateAlkoholName,
  };

  return (
    <AlkoholContext.Provider value={value}>{children}</AlkoholContext.Provider>
  );
}

export default AlkoholContextProvider;
