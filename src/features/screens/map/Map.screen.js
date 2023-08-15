import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import MapSearch from "./Map.search";
import styled from "styled-components/native";
import MapView from "react-native-maps";
import { LocationContext } from "../../../services/locations/location.context";

const CustomMapView = styled(MapView)`
  width: 100%;
  height: 100%;
`;

function MapScreen() {
  const { location } = useContext(LocationContext);

  return (
    <SafeAreaView>
      <MapSearch
        region={{
          latitude: location?.lat,
          longitude: location?.lng,
          longitudeDelta: 0.01,
        }}
      />

      <CustomMapView />
    </SafeAreaView>
  );
}

export default MapScreen;
