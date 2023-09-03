import React from "react";
import { View } from "react-native";
import { styled } from "styled-components/native";
import CustomText from "../typography/text.component";
import CustomRestuarantCard from "../CustomRestuarantCard/CustomRestuarantCard";
import { ScrollView } from "react-native";

const FavoriteWrapper = styled(View)`
  padding: 10px;
`;

const CustomTextWithStyles = styled(CustomText)`
  margin-bottom: 10px;
`;
function FavoriteBar({ favorites }) {
  return (
    <FavoriteWrapper>
      <CustomTextWithStyles variant="body">Favorites</CustomTextWithStyles>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites?.length > 0 &&
          favorites.map((singleFavoriteRestaurant) => {
            const key = singleFavoriteRestaurant.name.split(" ").join("");
            //remove space
            return (
              <View style={{ marginRight: 20 }} key={key}>
                <CustomRestuarantCard
                  restaurant={singleFavoriteRestaurant}
                  usingIsFavoriteBar={true}
                />
              </View>
            );
          })}
      </ScrollView>
    </FavoriteWrapper>
  );
}

export default FavoriteBar;
