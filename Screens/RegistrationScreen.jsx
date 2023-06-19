import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
// import BgImg from '../assets/images/BG.png'

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  return (
     
 <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // style={{ flex: 1, justifyContent: "center" }}
          >
      <StatusBar style="auto" />
      <ImageBackground
        source={require("../assets/images/BG.png")}
        style={styles.imgBg}
      >
  
        <View style={styles.formContainer}>
          <View style={styles.avatar}>
            <AntDesign name="pluscircleo" size={25} style={styles.addIcon} />
          </View>
        
            <Text style={styles.title}>Registration</Text>
            <TextInput
              style={styles.input}
              placeholder="Login"
              onChange={(val) => setLogin(val)}
              onFocus={()=>setIsShowKeyboard(true)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChange={(val) => setEmail(val)}
              onFocus={()=>setIsShowKeyboard(true)}
            />
            <View style={styles.passwordWrap}>
              <TextInput
                name="password"
                // value={password}
                secureTextEntry
                style={styles.input}
                placeholder="Password"
                onChange={(val) => setPassword(val)}
                
              />
              <Pressable>
                <Text style={styles.showBtn}>Show</Text>
              </Pressable>
            </View>
         
          <View style={styles.logIn}>
            <Pressable style={styles.buttonWrap}>
              <Text style={styles.button}>Sign up</Text>
            </Pressable>
            <View style={styles.textWrap}>
              <Text style={styles.text}>Already have an account? Sign in</Text>
            </View>
            </View>
            
          </View>
         
      </ImageBackground>
</KeyboardAvoidingView>
       
  );
};

const styles = StyleSheet.create({
  container: {},
  imgBg: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    position: "absolute",
    width: "100%",
    height: "65%",
    bottom: 0,
    paddingTop: 92,
    paddingBottom: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 35,
  },
  form: {
    paddingTop: 32,
    marginBottom: 30,
  },
  avatar: {
    position: "absolute",
    margin: "auto",
    top: -60,
    left: Dimensions.get("window").width / 2 - 60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addIcon: {
    position: "absolute",
    right: -13,
    bottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    color: "#FF6C00",
  },
  input: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    padding: 16,
    marginBottom: 16,
    height: 50,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  passwordWrap: {
    position: "relative",
  },
  showBtn: {
    position: "absolute",
    right: 16,
    transform: [{ translateY: -50 }],
    textAlign: "right",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
  },
  buttonWrap: {
    width: "auto",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  button: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  textWrap: {
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
