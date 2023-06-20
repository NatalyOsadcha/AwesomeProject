import React, {useState} from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
  KeyboardAvoidingView
} from "react-native";

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <TouchableWithoutFeedback>
      <ImageBackground
        source={require("../assets/images/BG.png")}
        style={styles.imgBg}
      >
        <View style={styles.cleanBg}></View>
        <View style={styles.logInContainer}>
          <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // style={{ flex: 1, justifyContent: "center" }}
          >
          <Text style={styles.title}>Sign in</Text>
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
            />
            <Pressable>
              <Text style={styles.showBtn}>Show</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
          <Pressable style={styles.buttonWrap}>
              <Text style={styles.button}>Sign in</Text>
          </Pressable>
          <View style={styles.textWrap}>
            <Text style={styles.text}>Don't have an account?</Text>
            <Pressable>
              <Text style={styles.link}>Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {},
  imgBg: {
    width: "100%",
    height: "100%",
  },
  cleanBg: {
    height: "40%",
  },
  logInContainer: {
    height: "60%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 35,
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
     display: 'flex',
     flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    marginRight: 5,
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  }
});
