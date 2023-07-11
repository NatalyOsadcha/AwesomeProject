import React, { useState, useEffect, useRef } from "react";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
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
  Image,
} from "react-native";
import ActiveSubmitButton from "../Components/ActiveSubmitButton";
import InactiveSubmitButton from "../Components/InactiveSubmitButton";

export default function CreatePostsScreen() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const navigation = useNavigation();
  const {} = useRoute();
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

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhotoUri(uri);
    }
  };

  // const deletePhoto = async () => {
  //   if (photoUri) {
  //     await MediaLibrary.deleteAssetsAsync([photoUri]);
  //     setPhotoUri(null);
  //   }
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          {hasPermission && focused && (
            <View style={styles.cameraView}>
              {photoUri ? (
                <Image style={styles.photo} source={{ uri: photoUri }} />
              ) : (
                <Camera style={styles.camera} type={type} ref={setCameraRef}>
                  <View style={styles.photoView}>
                    <TouchableOpacity
                      style={styles.flipWrapper}
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
                      onPress={takePicture}
                    >
                      <View style={styles.iconWrapper}>
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
            </View>
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
          {name !== "" && place !== "" && photoUri !== "null" ? (
            <ActiveSubmitButton
              text={"Publish"}
              onPress={() => navigation.navigate("Posts")}
            />
          ) : (
            <InactiveSubmitButton text={"Publish"} />
          )}
        </KeyboardAvoidingView>
        <View style={{ flex: 1 }}></View>
        {photoUri ? (
          <Pressable
            style={{ ...styles.trashWrapper, backgroundColor: "#FF6C00" }}
            onPress={() => setPhotoUri(null)}
          >
            <FontAwesome5 name="trash-alt" size={24} color="#fff" />
          </Pressable>
        ) : (
          <View style={{ ...styles.trashWrapper, backgroundColor: "#F6F6F6" }}>
            <FontAwesome5 name="trash-alt" size={24} color="#BDBDBD" />
          </View>
        )}
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
  button: {
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
  photo: {
    height: 300,
    borderRadius: 8,
  },
  photoView: {
    height: 300,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    position: "relative",
  },
  flipWrapper: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  cameraWrapper: {
    left: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  photoText: {
    marginBottom: 16,
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
    height: 40,
    width: 70,
    alignItems: "center",
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 32,
  },
});
