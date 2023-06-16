import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// import BgImg from '../assets/images/BG.png'

export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/BG.png")}
        style={styles.img}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  img: {
    // position: 'absolute',
    flex: 1,
    // height: Dimensions.get('window').height
  }
});



