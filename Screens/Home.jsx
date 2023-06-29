import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons} from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = focused
              ? "appstore-o"
              : "appstore-o";
          } else if (route.name === "Create posts") {
            iconName = focused ? "plus" : "plus";
          } else if (route.name === "My profile") {
            iconName = focused ? "user" : "user";
          }
              return <AntDesign name={iconName} size={24} color={'rgba(33, 33, 33, 0.8)'} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
          <Tabs.Screen name="Posts" component={PostsScreen} options={{ headerRight: () => (<Ionicons name="exit-outline" size={24} color="#BDBDBD" style={{marginRight: 13}} />) }} />
          <Tabs.Screen name="Create posts" component={CreatePostsScreen}/>
          <Tabs.Screen name="My profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
