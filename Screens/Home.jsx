import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/authOperationFirebase";

const Tabs = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarItemStyle: {
          marginTop: 9,
          marginBottom: 20,
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 100,
          size: 24,
        },
        tabBarStyle: { height: 83 },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.41,
          fontFamily: "Roboto-Medium",
        },
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <Ionicons
              name="exit-outline"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 13 }}
              onPress={() =>
                dispatch(logOut()) &
                navigation.navigate("Login")
              }
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <View>
              <AntDesign name="appstore-o" size={size} color={color} />
            </View>
          ),
          tabBar: {display: 'none' },
        }}
      />
      <Tabs.Screen
        name="Create posts"
        component={CreatePostsScreen}
        options={{ 
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
          headerLeft: () => (
            <AntDesign name="arrowleft" size={24} color={"rgba(33, 33, 33, 0.8)"} style={{ marginLeft: 13 }}
              onPress={() =>
                navigation.navigate("Posts")} />
          )
        }}
      />
      <Tabs.Screen
        name="My profile"
        component={ProfileScreen}
        options={{  headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
