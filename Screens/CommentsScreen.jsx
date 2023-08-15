import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  FlatList,
} from "react-native";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import ellipse from "../assets/images/ellipse.png";

export default function CommentsScreen({ route }) {

  const { photo, postId, comments  } = route.params;

  const [isKeyboardShown, setisKeyboardShown] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    if (comments && comments.length > 0) {
      setAllComments(comments);
    }
  }, [comments]);

  const keyBoardHide = () => {
    Keyboard.dismiss();
    setisKeyboardShown(false);
  };

  const createComment = async () => {
    keyBoardHide();
      if (!comment.trim()) {
    return; 
  }
    const commentData = {
      time: new Date(),
      comment: comment,
      id: postId,
    };
    const updatedComments = [...allComments, commentData];
    setAllComments(updatedComments);
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        comments: updatedComments,
      });
    } catch (error) {
      console.error(error);
    }
    setComment("");
  };

  const renderPostItem = ({ item }) => {
    const dateOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
      item.time
    );
    const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
      item.time
    );

    return (
      <View style={styles.commentWrapper}>
        <Image style={styles.userImage} source={ellipse} />
        <View style={styles.userCommentWrapper}>
          <Text style={styles.userComment}>{item.comment}</Text>
          <Text style={styles.userCommentData}>
            {formattedDate} | {formattedTime}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <View style={styles.container}>
        <View style={styles.photoWrapper}>
          <Image style={styles.photo} source={{ uri: photo }} />
        </View>
        <FlatList
          data={allComments}
          renderItem={renderPostItem}
          keyExtractor={(item, index) => item.id + index.toString()}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            name="comment"
            value={comment}
            style={styles.input}
            placeholder="Leave your comment..."
            onChangeText={setComment}
          ></TextInput>
          <Pressable onPress={createComment} style={styles.icon} >
            <Ionicons name="arrow-up" size={32} color={"#fff"} />
          </Pressable>
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
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  photoWrapper: {
    marginBottom: 32,
  },
  photo: {
    width: "100%",
    height: 240,
    position: "relative",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  commentWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 24,
  },
  userImage: {
    width: 40,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    marginRight: 16,
  },
  userCommentWrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 6,
  },
  userComment: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  userCommentData: {
    color: "#BDBDBD",
    fontSize: 10,
    fontFamily: "Roboto-Regular",
    textAlign: "right",
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
    right: 18,
    bottom: 14,
    color: "#fff",
    textAlign: "right",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});
