import React, { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import ActiveSubmitButton from "../Components/ActiveSubmitButton";
import InactiveSubmitButton from "../Components/InactiveSubmitButton";

export default function CreatePostsScreen() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const navigation = useNavigation();
  const { } = useRoute();
  const focused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          {hasPermission && focused && (
            <Camera style={styles.camera} type={type} ref={setCameraRef}>
              <View style={styles.photoView}>
                <TouchableOpacity
                  style={styles.flipContainer}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <MaterialIcons
                    name="flip-camera-android"
                    size={35}
                    color="#BDBDBD"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    if (cameraRef) {
                      const { uri } = await cameraRef.takePictureAsync();
                      await MediaLibrary.createAssetAsync(uri);
                    }
                  }}
                >
                  <View style={styles.cameraWrapper}>
                    <FontAwesome
                      name="camera"
                      size={24}
                      color={"#BDBDBD"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </Camera>
          )}
          <Text style={styles.photoText}>Upload photo/ Edit photo</Text>
          <TextInput
            placeholder="Name..."
            style={styles.inputName}
            name="name"
            value={name}
            onChangeText={setName}
          />
          <View style={styles.placeWrapper}>
            <TextInput
              name="place"
              value={place}
              onChangeText={setPlace}
              placeholder="Place..."
              style={styles.input}
              paddingLeft={30}
            />
            <Pressable
              onPress={() => navigation.navigate("Map")}
              style={styles.mapWrapper}
            >
              <FontAwesome5 name="map-marker-alt" size={24} color="#BDBDBD" />
            </Pressable>
          </View>
          {name !== "" ? (
            <ActiveSubmitButton text={"Publish"} onPress={() => navigation.navigate("Posts")} />
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
  cameraWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  photoView: {
    height: 320,
    overflow: "hidden",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  flipContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  photoText: {
    marginBottom:16,
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
