import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Dimensions,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import ActiveSubmitButton from "../Components/ActiveSubmitButton";
import InactiveSubmitButton from "../Components/InactiveSubmitButton";
import { register } from "../redux/auth/authOperationFirebase";

export default function RegistrationScreen() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [photoURL, setPhotoURL] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleSecureTextEntry = () => {
    setSecureTextEntry((prevState) => !prevState);
  };

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setPhotoURL(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onLogin = async () => {
    if (login === "" || email === "" || password === "") {
      Alert.alert("All fields are required!");
    } else if (
      !email.includes("@") ||
      !email.includes(".") ||
      email.length < 6
    ) {
      Alert.alert(`Email must follow the standard (e.g. "user@example.com").`);
    } else if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters long");
    } else {
      try {
        const user = await dispatch(register({ email, password, login }));
        if (user) {
          Alert.alert("You have registered successfully");
          navigation.navigate("Home");
        } else {
          Alert.alert("Failed to create user. Please try again.");
        }
      } catch (error) {
 
        Alert.alert("Failed to create user. Please try again.");
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
            <View style={styles.formContainer}>
              <View style={{ marginBottom: 20 }}>
                <View style={styles.avatar}>
                  {photoURL ? (
                    <Image
                      source={{ uri: photoURL }}
                      style={styles.avatarImage}
                    />
                  ) : (
                    <></>
                  )}
                  <View style={styles.addWrapper}>
                    <Pressable onPress={openImagePicker}>
                      {photoURL ? ( <AntDesign
                        name="pluscircleo"
                        size={25}
                        style={styles.addIconGrey}
                      />):( <AntDesign
                        name="pluscircleo"
                        size={25}
                        style={styles.addIcon}
                      />)}
                     
                    </Pressable>
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
                  {login !== "" && email !== "" && password !== "" ? (
                    <ActiveSubmitButton text={"Sign up"} onPress={onLogin} />
                  ) : (
                    <InactiveSubmitButton text={"Sign up"} />
                  )}
                  <View style={styles.textWrap}>
                    <Text style={styles.text}>Already have an account?</Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
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
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addIcon: {
    color: "#FF6C00",
  },
  addIconGrey: { color: "#BDBDBD",
    transform: [{ rotate: "45deg" }],},
  
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
