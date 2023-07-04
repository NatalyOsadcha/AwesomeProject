import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import MapScreen from "./Screens/MapScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import Home from "./Screens/Home";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
// import getHeaderTitle from "./Components/getHeaderTitle";
import { AntDesign } from "@expo/vector-icons";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.41,
            fontFamily: "Roboto-Medium",
          },
        }}
      >
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          // options={({ route }) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <AntDesign
                name="arrowleft"
                size={24}
                color={"rgba(33, 33, 33, 0.8)"}
                style={{ marginLeft: 13 }}
              />
            ),
          }}
        />
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <AntDesign
                name="arrowleft"
                size={24}
                color={"rgba(33, 33, 33, 0.8)"}
                style={{ marginLeft: 13 }}
              />
            ),
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
