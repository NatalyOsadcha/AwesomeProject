import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/config";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { logOut } from "../redux/auth/authOperationFirebase";
import {
  AntDesign,
  Ionicons,
  FontAwesome5,
  EvilIcons,
} from "@expo/vector-icons";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";

import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { db } from "../firebase/config";
import avatar from "../assets/images/avatar.png";

export default function ProfileScreen() {

  const navigation = useNavigation();
  const dispatch = useDispatch();
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
      throw error;
    }
  };

  const handleLike = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      const postSnapshot = await getDoc(postRef);
      const postLikes = postSnapshot.data().likes;
      const updatedLikes = Number(postLikes + 1);

      await updateDoc(postRef, {
        likes: updatedLikes,
      });

       const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            data: {
              ...post.data,
              likes: updatedLikes,
            },
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  }

  const renderPostItem = ({ item }) => {
    if (!item.data) {
      return null;
    }

    const placeParts = item.data.place.split(", ");
    const country = placeParts[0];

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
                  likes: item.data.likes,
                })
              }
            >
              {item.data.comments.length > 0 ? (
                <FontAwesome5 name="comment" size={24} color="#FF6C00" solid />
              ) : (
                <FontAwesome5 name="comment" size={24} color="#BDBDBD" />
              )}
            </Pressable>
            <Text style={styles.photoComments}>
              {item.data.comments.length}
            </Text>
              <Pressable onPress={() => handleLike(item.id)}>
                <EvilIcons name="like" size={34} color={item.data.likes > 0 ? ("#FF6C00") : ("#BDBDBD") } />
              </Pressable>
           
            <Text style={styles.photoComments}>{item.data.likes}</Text>
          </View>
          <View style={styles.wrapper}>
            <Pressable onPress={() => navigation.navigate("Map")}>
              <FontAwesome5 name="map-marker-alt" size={24} color="#BDBDBD" />
            </Pressable>
            <Text style={styles.photoPlace}>{country}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/BG.png")}
        style={styles.imgBg}
      >
        <View style={styles.topContainer}></View>
        <View style={styles.formContainer}>
          <View>
            <View style={styles.avatar}>
              <Image source={avatar} style={styles.avatarImg} />
              <View style={styles.addWrapper}>
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  style={styles.addIcon}
                />
              </View>
            </View>
          </View>
          <View>
            <Ionicons
              name="exit-outline"
              size={28}
              color="#BDBDBD"
              style={styles.exitIcon}
              onPress={() => dispatch(logOut()) & navigation.navigate("Login")}
            />
            <Text style={styles.title}>{user?.login}</Text>
            <FlatList
              data={posts}
              renderItem={renderPostItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    flex: 1,
    resizeMode: "cover",
  },
  topContainer: {
    height: 150,
  },
  formContainer: {
    height: Dimensions.get("window").height - 150,
    position: "relative",
    paddingTop: 92,
    paddingBottom: 110,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 35,
  },
  exitIcon: {
    position: "absolute",
    right: 0,
    top: -78,
  },
  addWrapper: {
    position: "absolute",
    right: -12,
    bottom: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  avatar: {
    position: "absolute",
    top: -152,
    left: Dimensions.get("window").width / 2 - 76,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatarImg: { width: 120, height: 120 },
  addIcon: {
    color: "#BDBDBD",
    transform: [{ rotate: "45deg" }],
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
    marginRight: 30,
    color: "#212121",
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
