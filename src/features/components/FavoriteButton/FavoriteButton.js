import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";
import { FavoriteContext } from "../../../services/favorites/favorites.context";

const FavoriteButtonTouchable = styled(TouchableOpacity)`
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 9;
`;

function FavoriteButton({ restaurant }) {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoriteContext);

  const isFavorite = favorites.find(
    (loopRestaurant) => loopRestaurant.placeId === restaurant.placeId
  );

  return (
    <FavoriteButtonTouchable
      onPress={() => {
        !isFavorite
          ? addToFavorites(restaurant)
          : removeFromFavorites(restaurant);
      }}
    >
      <AntDesign
        name={isFavorite ? "heart" : "hearto"}
        color={isFavorite ? "red" : "white"}
        size={25}
      />
    </FavoriteButtonTouchable>
  );
}

export default FavoriteButton;
