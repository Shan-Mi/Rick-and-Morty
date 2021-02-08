import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import CharScreen from "../screens/CharScreen";
import {
  BottomTabParamList,
  HomeTabParamList,
  CharTabParamList,
  SearchTabParamList,
} from "../types";
import SearchScreen from "../screens/SearchScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.primary,
        style: {
          backgroundColor: Colors.black,
          borderTopColor: "transparent",
        },
      }}>
      <BottomTab.Screen
        name="Char"
        component={CharNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <CharIcon name="people-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <SearchIcon name="search1" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function HomeIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}
function CharIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
function SearchIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeTabParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitle: () => null,
        headerStyle: {
          shadowColor: "transparent",
          backgroundColor: Colors.black,
        },
      }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: "Rick and Morty",
          headerTitleStyle: {
            fontFamily: "PressStart2P_400Regular",
            color: Colors.primary,
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

const CharStack = createStackNavigator<CharTabParamList>();

function CharNavigator() {
  return (
    <CharStack.Navigator
      screenOptions={{
        headerTitle: () => null,
        headerStyle: {
          shadowColor: "transparent",
          backgroundColor: Colors.black,
        },
      }}>
      <CharStack.Screen
        name="CharScreen"
        component={CharScreen}
        options={{
          headerTitle: "Characters",
          headerTitleStyle: {
            fontFamily: "PressStart2P_400Regular",
            color: Colors.primary,
          },
        }}
      />
    </CharStack.Navigator>
  );
}

const SearchStack = createStackNavigator<SearchTabParamList>();

function SearchNavigator<SearchTabParamList>() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTitle: () => null,
        headerStyle: {
          shadowColor: "transparent",
          backgroundColor: Colors.black,
        },
      }}>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerTitle: "Search Result",
          headerTitleStyle: {
            fontFamily: "PressStart2P_400Regular",
            color: Colors.primary,
          },
        }}
      />
    </SearchStack.Navigator>
  );
}
