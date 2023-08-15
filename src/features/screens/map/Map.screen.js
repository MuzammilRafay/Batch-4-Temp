import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import MapSearch from "./Map.search";
import styled from "styled-components/native";
import MapView, { Marker, Callout } from "react-native-maps";
import { LocationContext } from "../../../services/locations/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import MapCalloutComponent from "./MapCallout.component";

function MapScreen({ navigation }) {
  const [latDelta, setLatDelta] = useState(0);
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  console.log(restaurants[0], "restaurants");

  return (
    <SafeAreaView>
      <MapSearch />

      <MapView
        style={{
          height: "100%",
          width: "100%",
        }}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() => {
                  navigation.navigate("RestaurantDetail", {
                    singleRestaurant: restaurant?.item,
                  });
                }}
              >
                <MapCalloutComponent restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}

export default MapScreen;
