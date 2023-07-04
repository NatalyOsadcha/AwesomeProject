import {
  StyleSheet,
  Text,
  Pressable,
} from "react-native";

import React from "react";

export default function ActiveSubmitButton({ text, onPress }) {
  return (
    <Pressable style={styles.buttonWrap} onPress={onPress}>
      <Text style={styles.button}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
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
});
