import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
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
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <View style={styles.headerContainer}>
          <Text style={styles.header}>Publications</Text>
        </View> */}
        <View style={styles.body}>
          <View style={styles.user}>
            <View style={styles.avatarWrap}>
              <Image></Image>
            </View>
            <View>
              <Text style={styles.name}>Natali Romanova</Text>
              <Text style={styles.email}>email@example.com</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.footer}>
          <Pressable style={styles.storeWrap}>
            <AntDesign
              name="appstore-o"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              style={styles.icon}
            />
          </Pressable>
          <Pressable style={styles.addWrap}>
            <AntDesign
              name="plus"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
          </Pressable>
          <Pressable style={styles.userWrap}>
            <SimpleLineIcons
              name="user"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              style={styles.icon}
            />
          </Pressable>
        </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
    position: "relative",
    // height: "100%",
  },
  // headerContainer: {
  //   width: "100%",
  //   height: 44,
  //   borderBottomWidth: 1,
  //   borderColor: "#E8E8E8",
  //   borderStyle: "solid",
  // },
  // header: {
  //   fontSize: 17,
  //   fontFamily: "Roboto-Medium",
  //   textAlign: "center",
  //   lineHeight: 22,
  //   letterSpacing: -0.41,
  //   paddingTop: 11,
  //   paddingBottom: 11,
  //   color: "#212121",
  // },
  body: {
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
  // footer: {
  //   position: "absolute",
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "baseline",
  //   bottom: 0,
  //   width: "100%",
  //   height: 83,
  //   borderTopWidth: 1,
  //   borderColor: "#E8E8E8",
  //   borderStyle: "solid",
  //   paddingTop: 9,
  // },
  addWrap: {
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
  icon: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 23,
    paddingRight: 23,
  },
});
