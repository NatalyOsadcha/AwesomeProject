import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function PostsScreen() {
  const navigation = useNavigation();
  const {} = useRoute();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.user}>
          <View style={styles.avatarWrap}>
            <Image></Image>
          </View>
          <View>
            <Text style={styles.name}>Natali Romanova</Text>
            <Text style={styles.email}>email@example.com</Text>
          </View>
        </View>
        <View style={styles.photoWrapper}>
          <Image style={styles.photo} />
          <Text style={styles.photoText}>Forest</Text>
          <View style={styles.photoDescription}>
            <View style={styles.wrapper}>
              <Pressable onPress={() => navigation.navigate("Comments")}>
                <FontAwesome5 name="comment" size={24} color="#BDBDBD" />
              </Pressable>
              <Text style={styles.photoComments}>0</Text>
            </View>
            <View style={styles.wrapper}>
              <Pressable onPress={() => navigation.navigate("Map")}>
                <FontAwesome5 name="map-marker-alt" size={24} color="#BDBDBD" />
              </Pressable>
              <Text style={styles.photoPlace}>Place</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  photoWrapper: {
    marginTop: 32,
    marginBottom: 32,
  },
  photo: {
    width: "100%",
    marginBottom: 8,
    height: 240,
    position: "relative",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  photoDescription: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  photoText: {
    marginBottom: 8,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },
  photoComments: {
    marginLeft: 8,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  photoPlace: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
});
