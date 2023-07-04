import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons'; 
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";

export default function CommentsScreen() {
  const [comment, setComment] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.photoWrapper}>
        <Image style={styles.photo} />
      </View>
      <View style={styles.inputWrapper}>
          <TextInput
        name="comment"
        value={comment}
        style={styles.input}
        placeholder="Leave your comment..."
        onChangeText={setComment}
        ></TextInput>
        <View style={styles.icon}>
          <Ionicons name="arrow-up" size={24} color={"#fff"} padding={8}/>
        </View>
      
      </View>
    
      {/* <Text>CommentsScreen</Text> */}
    </View>
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
  photoWrapper: {
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
  inputWrapper: {
     position: "relative",
  },
  input: {
    width: "auto",
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  icon: {
        position: "absolute",
    right: 8,
    bottom: 6,
    color:"#fff",
    textAlign: "right",

    borderRadius: 50,
    backgroundColor: '#FF6C00'
  },
});
