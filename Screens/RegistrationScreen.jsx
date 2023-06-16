import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
// import BgImg from '../assets/images/BG.png'

export const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        source={require("../assets/images/BG.png")}
        style={styles.imgBg}
      >
        <View style={styles.top}>
          <Text style={styles.text}>Hello!</Text>
        </View>
         <View style={styles.form}>
          <Text style={styles.text}>Реєстрація</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
   
  },
  imgBg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    // justifyContent: "center",
    // flex: 1,
    // justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
  top: {
    height: '35%',
    width:'100%',
  },
  form: {
    height: '65%',
    width:'100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
     alignItems: "center",
    justifyContent: "center",
  }
});
