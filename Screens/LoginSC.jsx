import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Keyboard,
} from "react-native";

export default function LoginSC() {
  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text>Login</Text>
        </View>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
