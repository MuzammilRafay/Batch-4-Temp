import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext();

const saveFavoriteKeyForStorage = "@favorites";

export const FavoriteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const saveFavorites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(saveFavoriteKeyForStorage, jsonValue);
    } catch (e) {
      // saving error
      console.log("Error:  while saving the favorites", e);
    }
  };

  const getFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(saveFavoriteKeyForStorage);
      const jsonParsedValue = jsonValue != null ? JSON.parse(jsonValue) : null;

      setFavorites(jsonParsedValue);
    } catch (e) {
      // error reading value
      console.log("Error:  while getting the favorites", e);
    }
  };

  const add = (singleRestaurant) => {
    setFavorites([...favorites, singleRestaurant]);
  };

  const remove = (singleRestaurant) => {
    const newFavorites = favorites.filter(
      (loopRestaurant) => loopRestaurant.placeId !== singleRestaurant.placeId
    );
    //wo restaurant le ao jiski place id singleRestaurant.placeId ke brabar na ho
    //means remove kardo isko

    setFavorites(newFavorites);
  };

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    getFavorites();
  }, []);
  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addToFavorites: add,
        removeFromFavorites: remove,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
