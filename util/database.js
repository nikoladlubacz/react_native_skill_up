import * as SQLite from "expo-sqlite";
import { FavoriteDrink } from "../models/favoriteDrink";

const database = SQLite.openDatabase({ name: "favoriteDrinks.db" });

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS favoriteDrinks (
            drinkId INTEGER PRIMARY KEY NOT NULL,
            nameDrink TEXT NOT NULL,
            image TEXT NOT NULL,
        )`,
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

export function insertFavoriteDrink(drink) {
  console.log("GGGGGGGGg");
  const promise = new Promise((resolve, reject) => {
    console.log("FFFFFFFfff");
    database.transaction((tx) => {
      console.log("SSSSSSSSs");
      tx.executeSql(
        `INSERT INTO favoriteDrinks (drinkId, nameDrink, image) VALUES (?,?,?)`,
        [drink.drinkId, drink.nameDrink, drink.image],
        (_, result) => {
          console.log("MMMMMMMMMM");
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          console.log(error);
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
        "SELECT * FROM favoriteDrinks",
        [],
        (_, result) => {
          const favoriteDrinks = [];

          for (const dp of result.rows._array) {
            favoriteDrinks.push(
              new FavoriteDrink(dp.nameDrink, dp.image, dp.drinkId)
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
