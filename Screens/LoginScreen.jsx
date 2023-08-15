import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import ActiveSubmitButton from "../Components/ActiveSubmitButton";
import InactiveSubmitButton from "../Components/InactiveSubmitButton";
import { logIn } from "../redux/auth/authOperationFirebase";
import { selectIsLoggedIn } from "../redux/auth/authSelector";

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Home");
    }
  }, [isLoggedIn]);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry((prevState) => !prevState);
  };

  const onLogin = async () => {
    if (!email.includes("@") || !email.includes(".") || email.length < 6) {
      Alert.alert(`Email must follow the standard (e.g. "user@example.com").`);
    } else if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters long");
    } else {
      try {
        const user = await dispatch(logIn({ email, password }));
        navigation.navigate("Home");
        setEmail("");
        setPassword("");
      } catch (error) {
        Alert.alert("Invalid email or password");
      }
    }
  };

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
            <View style={styles.logInContainer}>
              <Text style={styles.title}>Sign in</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
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
              {email !== "" && password !== "" ? (
                <ActiveSubmitButton text={"Sign in"} onPress={onLogin} />
              ) : (
                <InactiveSubmitButton text={"Sign in"} />
              )}
              <View style={styles.textWrap}>
                <Text style={styles.text}>Don't have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Registration")}>
                  <Text style={styles.link}>Sign up</Text>
                </Pressable>
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
  logInContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 70,
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
