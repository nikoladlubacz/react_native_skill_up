import * as SQLite from "expo-sqlite";
import { FavoriteDrink } from "../models/favoriteDrink";

const database = SQLite.openDatabase(`favoriteDrinks3.db`);

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS favoriteDrinks3 (nameDrink TEXT NOT NULL, image TEXT NOT NULL, drinkNumber INTEGER PRIMARY KEY NOT NULL)`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertFavoriteDrink(favoriteDrink) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO favoriteDrinks3 (nameDrink, image, drinkNumber) VALUES (?, ?, ?)`,
        [
          favoriteDrink.nameDrink,
          favoriteDrink.image,
          favoriteDrink.drinkNumber,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
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
        `SELECT * FROM favoriteDrinks3`,
        [],
        (_, result) => {
          const favoriteDrinks = [];
          for (const dp of result.rows._array) {
            favoriteDrinks.push(
              new FavoriteDrink(dp.nameDrink, dp.image, dp.drinkNumber)
            );
          }

          resolve(favoriteDrinks);
        },
        (_, error) => {
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
        `SELECT * FROM favoriteDrinks3 WHERE drinkNumber = ?`,
        [id],
        (_, result) => {
          const favoriteDrinks = [];
          for (const dp of result.rows._array) {
            favoriteDrinks.push(
              new FavoriteDrink(dp.nameDrink, dp.image, dp.drinkNumber)
            );
          }
          resolve(favoriteDrinks);
        },
        (_, error) => {
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
        `DELETE FROM favoriteDrinks3 WHERE drinkNumber = ?`,
        [id],
        (_, result) => {},
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
