import * as React from "react";
import { Button, ImageBackground, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";
import Colors from "../constants/Colors";
import { getRandomCharacter } from "../Api";
import { useState } from "react";
import { useEffect } from "react";

// const image = {
//   uri: "https://i.ibb.co/nn1Q1qt/Rickandmortyseason4dvdcover.jpg",
// };

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const [imageUrl, setImageUrl] = useState({ uri: "" });

  useEffect(() => {
    const getImage = async () => {
      const {
        data: { image },
      } = await getRandomCharacter();
      setImageUrl({ uri: image });
      console.log(imageUrl);
    };
    getImage();
  }, []);

  const handlePress = async () => {
    const {
      data: { image },
    } = await getRandomCharacter();
    console.log(image);
  };

  if (!fontsLoaded) {
    return <Text>Loading font</Text>;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground source={imageUrl} style={styles.image}>
          <Text style={styles.title}></Text>
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
