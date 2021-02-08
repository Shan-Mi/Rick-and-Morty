import * as React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";
import Colors from "../constants/Colors";

const image = {
  uri: "https://i.ibb.co/nn1Q1qt/Rickandmortyseason4dvdcover.jpg",
};

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading font</Text>;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.title}>Rick and Morty</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "PressStart2P_400Regular",
    textAlign: "center",
    color: Colors.primary,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
