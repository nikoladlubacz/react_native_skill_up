import { createContext, useState } from "react";


export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteDrinkIds, setFavoriteDrinkIds] = useState([]);

  function addFavorite(id) {
    setFavoriteDrinkIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id) {
    setFavoriteDrinkIds((currentFavIds) =>
      currentFavIds.filter((drinkId) => drinkId !== id)
    );
  }

  const value= {
    ids: favoriteDrinkIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
