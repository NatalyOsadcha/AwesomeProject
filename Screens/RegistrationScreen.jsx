import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

export default function RegistrationScreen() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();
  const {} = useRoute();

  const toggleSecureTextEntry = () => {
    setSecureTextEntry((prevState) => !prevState);
  };

  //  const onLogin = () => {
  //   console.log("Credentials", `${login} +${email} + ${password}`);
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <ImageBackground
          source={require("../assets/images/BG.png")}
          style={styles.imgBg}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <View style={styles.formContainer}>
              <View style={{ marginBottom: 20 }}>
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
                  name="login"
                  value={login}
                  style={styles.input}
                  placeholder="Login"
                  onChangeText={setLogin}
                />
                <TextInput
                  name="email"
                  value={email}
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={setEmail}
                />
                <View style={styles.passwordWrap}>
                  <TextInput
                    name="password"
                    value={password}
                    secureTextEntry={secureTextEntry}
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={setPassword}
                  />
                  <Pressable onPress={toggleSecureTextEntry}>
                    <Text style={styles.showBtn}>
                      {secureTextEntry ? "Show" : "Hide"}
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.logIn}>
                  <Pressable
                    style={styles.buttonWrap}
                    onPress={() => navigation.navigate("Home", {})}
                  >
                    <Text style={styles.button}>Sign up</Text>
                  </Pressable>
                  <View style={styles.textWrap}>
                    <Text style={styles.text}>Already have an account?</Text>
                    <Pressable onPress={() => navigation.navigate("Login", {})}>
                      <Text style={styles.link}>Sign in</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imgBg: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
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
    right: 0,
    top: -16,
    transform: [{ translateY: -50 }],
    textAlign: "right",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    padding: 16,
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
