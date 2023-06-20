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
  TouchableWithoutFeedback,
} from "react-native";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  return (
    <TouchableWithoutFeedback>
      <ImageBackground
        source={require("../assets/images/BG.png")}
        style={styles.imgBg}
      >
        <StatusBar style="auto" />
        <View style={styles.cleanBg}></View>
        <View style={styles.formContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 200}
          >
            <View style={{marginBottom: 50}}>
            <View style={styles.avatar}>
              <View style={styles.addWrapper}>
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  style={styles.addIcon}
                />
              </View>
            </View>
            <Text style={styles.title}>Registration</Text>
            <TextInput
              style={styles.input}
              placeholder="Login"
              onChange={(val) => setLogin(val)}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChange={(val) => setEmail(val)}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <View style={styles.passwordWrap}>
              <TextInput
                name="password"
                // value={password}
                secureTextEntry
                style={styles.input}
                placeholder="Password"
                onChange={(val) => setPassword(val)}
                onFocus={() => setIsShowKeyboard(true)}
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
                <Text style={styles.text}>Already have an account?</Text>
                <Pressable>
                  <Text style={styles.link}>Sign in</Text>
                </Pressable>
              </View>
              </View>
              </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {},
  imgBg: {
    width: "100%",
    height: "100%",
  },
  cleanBg: {
    height: "30%",
  },
  formContainer: {
    width: "100%",
    height: "70%",
    position: "relative",
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
  addWrapper: {
    position: "absolute",
    right: -12,
    bottom: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  avatar: {
    position: "absolute",
    top: -152,
    left: Dimensions.get("window").width / 2 - 76,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addIcon: {
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
    marginBottom: 43,
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
  // logIn: {
  //   marginTop: 43,

  // },
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
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    marginRight: 5,
  },
  link: {
    textDecorationLine: "underline",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
