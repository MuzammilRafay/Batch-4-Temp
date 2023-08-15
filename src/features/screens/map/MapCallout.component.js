import React from "react";
import styled from "styled-components/native";
import WebView from "react-native-webview";
import { Image, View } from "react-native";
import CustomText from "../../components/typography/text.component";

const CompactImage = styled(Image)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled(View)`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === "android";

export default MapCalloutComponent = ({ restaurant }) => {
  const Image = isAndroid ? CompactWebview : CompactImage;

  return (
    <Item>
      <CompactImage source={{ uri: restaurant.photos[0] }} />
      <CustomText center variant="caption" numberOfLines={3}>
        {restaurant.name}
      </CustomText>
    </Item>
  );
};
