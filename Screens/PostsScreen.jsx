import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5} from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { db } from "../firebase/config";
import avatar from "../assets/images/avatar-small.png";

export default function PostsScreen() {

  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await updateProfile(user, {});

        setUser({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });

        try {
          const fetchedPosts = await getDataFromFirestore(user.uid);
          setPosts(fetchedPosts);
        } catch (error) {
          console.error(error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", async () => {
      if (user && user.userId) {
        try {
          const fetchedPosts = await getDataFromFirestore(user.userId);
          setPosts(fetchedPosts);
        } catch (error) {
          console.error(error);
        }
      }
    });

    return () => focusListener();
  }, [navigation, user]);

  const getDataFromFirestore = async (userId) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), where("owner", "==", userId))
      );

      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      posts.sort((a, b) => b.data.timestamp - a.data.timestamp);
      return posts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const renderPostItem = ({ item }) => {
    if (!item.data) {
      return null;
    }
    return (
      <View style={styles.photoWrapper}>
        <Image style={styles.photo} source={{ uri: item.data.photoUri }} />
        <Text style={styles.photoText}>{item.data.name}</Text>
        <View style={styles.photoDescription}>
          <View style={styles.wrapper}>
            <Pressable
              onPress={() =>
                navigation.navigate("Comments", {
                  photo: item.data.photoUri,
                  postId: item.id,
                  comments: item.data.comments,
                })}>
               {item.data.comments.length > 0 ? (
      <FontAwesome5 name="comment" size={24} color="#FF6C00" solid/>
    ) : (
      <FontAwesome5 name="comment" size={24} color="#BDBDBD" />
    )}
            </Pressable>
            <Text style={styles.photoComments}>{item.data.comments.length}</Text>
          </View>
          <View style={styles.wrapper}>
            <Pressable onPress={() => navigation.navigate("Map")}>
              <FontAwesome5 name="map-marker-alt" size={24} color="#BDBDBD" />
            </Pressable>
            <Text style={styles.photoPlace}>{item.data.place}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.user}>
          <View style={styles.avatarWrap}>
            <Image source={avatar} />
          </View>
          <View>
            <Text style={styles.name}>{user?.login}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id}
        />
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
    marginBottom:32,
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
