import { Text, SafeAreaView, StatusBar, View } from "react-native";
import { ThemeProvider } from "styled-components";
import styled from "styled-components/native";
import theme from "./src/infrastructure/theme";
import {
  useFonts as useOswaldFont,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import {
  useFonts as useLatoFont,
  Lato_400Regular,
} from "@expo-google-fonts/lato";
import RestaurantScreen from "./src/features/screens/Restaurant.screen";
import { RestaurantProvider } from "./src/services/restaurants/restaurants.context";
import LocationContextProvider from "./src/services/locations/location.context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantNavigator } from "./src/navigation/restuarnts.navigator";
import MapScreen from "./src/features/screens/map/Map.screen";

const Tab = createBottomTabNavigator();
const TAB_ICONS = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const createScreenOptions = (parameter) => {
  // console.log(parameter, "parameter");
  const { route } = parameter;
  const iconName = TAB_ICONS[route.name];
  // const iconName = TAB_ICONS["Restaurants"];

  return {
    tabBarIcon: (tabBarParam) => {
      const { size, color } = tabBarParam;
      return <Ionicons name={iconName} size={size} color={color} />;
    },

    headerShown: false,
  };
};

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

// function MapScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Map!</Text>
//     </View>
//   );
// }

export default function App() {
  let [oswaldLoaded] = useOswaldFont({
    Oswald_400Regular,
  });
  let [latoFontLoaded] = useLatoFont({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoFontLoaded) {
    return null;
  }

  // const Title = styled(Text)`
  //   font-size: ${(props) => props.theme.sizes[3]};
  //   font-weight: 400;
  //   font-family: ${(props) => props.theme.fonts.body};
  // `;

  const CustomSafeAreaView = styled(SafeAreaView)`
    flex: 1;
    margin-top: ${StatusBar.currentHeight}px;
  `;

  return (
    <ThemeProvider theme={theme}>
      <LocationContextProvider>
        <RestaurantProvider>
          <CustomSafeAreaView>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={createScreenOptions}
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="Restaurants"
                  component={RestaurantNavigator}
                />
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </CustomSafeAreaView>
        </RestaurantProvider>
      </LocationContextProvider>
    </ThemeProvider>
  );
}
