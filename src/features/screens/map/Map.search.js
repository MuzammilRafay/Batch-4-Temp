import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { LocationContext } from "../../../services/locations/location.context";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

function MapSearch({ isFavoriteToggled = false }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { search } = useContext(LocationContext);

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon="map"
        onSubmitEditing={() => {
          search(searchQuery);
        }}
      />
    </SearchContainer>
  );
}

export default MapSearch;
