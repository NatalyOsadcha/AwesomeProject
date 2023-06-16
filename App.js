import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";


export default function App() {
  return (
    <View>
      <RegistrationScreen />
      {/* <LoginScreen/>
      <PostsScreen/>
      <Text>Hello!</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}


