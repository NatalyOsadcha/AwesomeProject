import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";


export default function App() {
 const [fontsLoaded] = useFonts({
   'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
   'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
   'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
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
    <View>
      <RegistrationScreen />
      {/* <LoginScreen/> */}
      {/* <PostsScreen/> */}
      {/* <Text>Hello!</Text>  */}
      <StatusBar style="auto" />
    </View>
  );
}


