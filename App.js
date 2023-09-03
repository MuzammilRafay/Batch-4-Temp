import React, { useState, useEffect } from "react";

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
import { FavoriteContextProvider } from "./src/services/favorites/favorites.context";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthenticationContext } from "./src/services/authentication/authentication.context";

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

const firebaseConfig = {
  apiKey: "AIzaSyC9Y2PrQLdTZnoQFMeBLypHTA4CXvV2JWM",
  authDomain: "laravel-nuxtjs.firebaseapp.com",
  databaseURL: "https://laravel-nuxtjs.firebaseio.com",
  projectId: "laravel-nuxtjs",
  storageBucket: "laravel-nuxtjs.appspot.com",
  messagingSenderId: "485211033057",
  appId: "1:485211033057:web:52f061411b5d615fbed6a0",
};

initializeApp(firebaseConfig);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      // https://firebase.google.com/docs/auth/web/password-auth
      const auth = getAuth();
      signInWithEmailAndPassword(auth, "admin@gmail.com", "admin123")
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user, "user");

          if (user) {
            setIsAuthenticated(true);
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }, 2000);
  }, []);

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

  if (!isAuthenticated) return null;

  return (
    <ThemeProvider theme={theme}>
      <AuthenticationContext>
        <FavoriteContextProvider>
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
        </FavoriteContextProvider>
      </AuthenticationContext>
    </ThemeProvider>
  );
}
