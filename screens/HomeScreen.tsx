import * as React from "react";
import { Button, ImageBackground, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { getRandomCharacter } from "../Api";
import { useState } from "react";
import { useEffect } from "react";

// const image = {
//   uri: "https://i.ibb.co/nn1Q1qt/Rickandmortyseason4dvdcover.jpg",
// };

export default function HomeScreen() {
  const [charInfo, setCharInfo] = useState({
    name: "",
    status: "",
    species: "",
    imageUrl: {},
  });

  const getImage = async () => {
    let {
      data: { image, status, name, species },
    } = await getRandomCharacter();

    setCharInfo({
      name,
      status,
      species,
      imageUrl: { uri: image },
    });
    setInterval(async () => {
      const {
        data: { image, status, name, species },
      } = await getRandomCharacter();
      setCharInfo({
        name,
        status,
        species,
        imageUrl: { uri: image },
      });
    }, 6500);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={charInfo.imageUrl} style={styles.image}>
        <Text style={styles.text}>{charInfo.name}</Text>
        <Text style={styles.text}>{charInfo.species}</Text>
        <Text style={styles.text}>{charInfo.status}</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
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
  text: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "PressStart2P_400Regular",
    color: Colors.primary,
    paddingBottom: 20,
  },
});
