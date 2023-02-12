import * as SQLite from "expo-sqlite";
import Drink from "../models/drink";

const database = SQLite.openDatabase(`favoriteDrinks62.db`);

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS favoriteDrinks62 (
          drinkId INTEGER PRIMARY KEY NOT NULL,
          nameDrink TEXT NOT NULL, 
          image TEXT NOT NULL, 
          instructions TEXT NOT NULL,
          ingredients TEXT NOT NULL)`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          console.log(error)
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertFavoriteDrink(drink) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO favoriteDrinks62 (drinkId, nameDrink, image, instructions, ingredients) VALUES (?, ?, ?, ?, ?)`,
        [
          drink.drinkId,
          drink.nameDrink,
          drink.image,
          drink.instructions,
          JSON.stringify(drink.ingredients)
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          console.log(error)
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchFavoriteDrinks() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM favoriteDrinks62`,
        [],
        (_, result) => {
          const favoriteDrinks = [];
          for (const dp of result.rows._array) {
            favoriteDrinks.push(
              new Drink(dp.drinkId, dp.nameDrink, dp.image, dp.instructions, JSON.parse(dp.ingredients))
            );
          }

          resolve(favoriteDrinks);
        },
        (_, error) => {
          console.log(error)
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchFavoriteDrinkById(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM favoriteDrinks62 WHERE drinkId = ?`,
        [id],
        (_, result) => {
          const favoriteDrinks = [];
          for (const dp of result.rows._array) {
            favoriteDrinks.push(
              new Drink(dp.drinkId, dp.nameDrink, dp.image, dp.instructions, JSON.parse(dp.ingredients))
            );
          }
          resolve(favoriteDrinks);
        },
        (_, error) => {
          console.log(error)
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function deleteFavoriteDrinkById(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM favoriteDrinks62 WHERE drinkId = ?`,
        [id],
        (_, result) => { },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
