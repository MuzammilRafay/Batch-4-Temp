import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import MapSearch from "./Map.search";
import styled from "styled-components/native";
import MapView, { Marker, Callout } from "react-native-maps";
import { LocationContext } from "../../../services/locations/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { ActivityIndicator } from "react-native";
import MapCalloutComponent from "./MapCalloutComponent";

function MapScreen({ navigation }) {
  const { location, isLoading: locationLoader } = useContext(LocationContext);
  const { isLoading: restaurantLoader, restaurants = [] } =
    useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [viewport, location]);
  const someLoaderAvailable = restaurantLoader || locationLoader;
  return (
    <SafeAreaView>
      <MapSearch />

      {someLoaderAvailable && (
        <ActivityIndicator size={50} animating={true} color="#0000ff" />
      )}

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
        {restaurants.map((singleRestaurant) => {
          return (
            <Marker
              key={singleRestaurant.name}
              title={singleRestaurant.name}
              coordinate={{
                latitude: singleRestaurant.geometry.location.lat,
                longitude: singleRestaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() => {
                  navigation.navigate("RestaurantDetail", {
                    singleRestaurant: singleRestaurant,
                  });
                }}
              >
                <MapCalloutComponent singleRestaurant={singleRestaurant} />
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}

export default MapScreen;
