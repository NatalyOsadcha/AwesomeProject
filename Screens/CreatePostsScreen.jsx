import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ActiveSubmitButton from "../Components/ActiveSubmitButton";
import InactiveSubmitButton from "../Components/InactiveSubmitButton";

export default function CreatePostsScreen() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const navigation = useNavigation();
  const {} = useRoute();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.photoWrapper}>
            <Image style={styles.photo} />
            <Pressable style={styles.cameraWrapper}>
              <FontAwesome name="camera" size={24} style={styles.camera} />
            </Pressable>
            <Text style={styles.photoText}>Upload photo/ Edit photo</Text>
          </View>
          <TextInput
            placeholder="Name..."
            style={styles.inputName}
            name="name"
            value={name}
            onChangeText={setName}
          ></TextInput>
          <View style={styles.placeWrapper}>
            <TextInput
              name="place"
              value={place}
              onChangeText={setPlace}
              placeholder="Place..."
              style={styles.input}
              paddingLeft={30}
            ></TextInput>
            <Pressable
              onPress={() => navigation.navigate("Map")}
              style={styles.mapWrapper}
            >
              <FontAwesome5 name="map-marker-alt" size={24} color="#BDBDBD" />
            </Pressable>
          </View>
          {name !== "" ? (
            <ActiveSubmitButton text={"Publish"} onPress={() => {}} />
          ) : (
            <InactiveSubmitButton text={"Publish"} />
          )}
        </KeyboardAvoidingView>
        <View style={{ flex: 1 }}></View>
        <Pressable style={styles.trashWrapper}>
          <FontAwesome5 name="trash-alt" size={24} color="#BDBDBD" />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    padding: 16,
  },
  photoWrapper: {
    marginTop: 16,
    marginBottom: 32,
  },
  photo: {
    width: "100%",
    marginBottom: 8,
    height: 240,
    position: "relative",
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
  },
  cameraWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -40 }],
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  camera: {
    color: "#BDBDBD",
  },
  photoText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
  input: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    marginBottom: 16,
    height: 50,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  inputName: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    marginBottom: 16,
    height: 50,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  mapWrapper: {
    position: "absolute",
    top: 10,
  },
  trashWrapper: {
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    height: 40,
    width: 70,
    alignItems: "center",
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 32,
  },
});
