import {
  StyleSheet,
  Text,
    Pressable,
  View,
} from "react-native";

import React from "react";

export default function InactiveSubmitButton({ text}) {
  return (
    <View style={styles.buttonWrap}>
      <Text style={styles.button}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonWrap: {
    width: "auto",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  button: {
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
