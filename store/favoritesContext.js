import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     drinkId: "e1",
//     nameDrink: "A pair of shoes",
//     image: "59.99",
//   },
// ];

export const FavoritesContext = createContext({
  drinkList: [],
  addFavorite: ({ drinkId, nameDrink, image }) => {},
  deleteFavorite: (id) => {},
});

function drinksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload }, ...state];
    case "DELETE":
      return state.filter((drink) => drink.drinkId !== action.payload);
    default:
      return state;
  }
}

function FavoritesContextProvider({ children }) {
  const [drinksState, dispatch] = useReducer(drinksReducer, []);

  function addFavoriteDrink(drinkData) {
    dispatch({ type: "ADD", payload: drinkData });
  }

  function deleteFavoriteDrink(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    drinkList: drinksState,
    addFavorite: addFavoriteDrink,
    deleteFavorite: deleteFavoriteDrink,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
