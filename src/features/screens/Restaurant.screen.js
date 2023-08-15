import React, { useContext } from "react";
import Search from "../components/search.component";
import CustomRestuarantCard from "../components/CustomRestuarantCard/CustomRestuarantCard";
// import { ScrollView } from "react-native";
import { styled } from "styled-components";
import { View, FlatList, TouchableOpacity, Platform } from "react-native";
import { ActivityIndicator } from "react-native";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";
import { LocationContext } from "../../services/locations/location.context";

const RestaurantListContainer = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)``;

function RestaurantScreen(props) {
  // const allRestaurants = Array.from({ length: 10 });
  //[undefined,undefined]
  // const isLoading = false;

  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { isLoading: locationLoader } = useContext(LocationContext);

  // console.log(props, "props");

  const { navigation } = props;

  const someLoaderAvailable = isLoading || locationLoader;
  return (
    <>
      <Search />

      {someLoaderAvailable && (
        <Loading size={50} animating={true} color="#0000ff" />
      )}

      {!someLoaderAvailable && (
        <RestaurantListContainer>
          {/* <ScrollView>
          {allRestaurants.map((singleRestaurant) => {
            return <CustomRestuarantCard restaurant={{}} />;
          })}
      </ScrollView> */}
          <RestaurantList
            data={restaurants}
            renderItem={(singleRestaurant) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RestaurantDetail", {
                      singleRestaurant: singleRestaurant?.item,
                    });
                  }}
                >
                  <CustomRestuarantCard restaurant={singleRestaurant?.item} />
                </TouchableOpacity>
              );
            }}
            // keyExtractor={(singleRestaurant) => singleRestaurant.name}
            keyExtractor={(item, index) => index}

            // contentContainerStyle={{
            //   padding: 16,
            // }}
          />
        </RestaurantListContainer>
      )}
    </>
  );
}

export default RestaurantScreen;
