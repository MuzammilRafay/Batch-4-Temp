import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { LocationContext } from "../../services/locations/location.context";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

function Search({ isFavoriteToggled = false, onFavoriteToggled }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { search } = useContext(LocationContext);

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon={isFavoriteToggled ? "heart" : "heart-outline"}
        onIconPress={onFavoriteToggled}
        onSubmitEditing={() => {
          search(searchQuery);
        }}
      />
    </SearchContainer>
  );
}

export default Search;
