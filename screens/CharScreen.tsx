import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Dimensions, Image } from "react-native";
import { FlatList, Platform, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { getOnePageChars } from "../Api";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";

interface CharProps {
  id?: number;
  name?: string;
  status?: string;
  species?: string;
  image?: string;
  type?: string;
  gender?: string;
  origin?: { [index: string]: string };
  location?: { [index: string]: string };
  created?: string;
  episode?: string[];
}

export default function CharScreen() {
  const [data, setData] = useState<CharProps[] | null>(null);
  const [currentPage, setCurrentPage] = useState(
    "https://rickandmortyapi.com/api/character?page=1"
  );
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [charInfo, setCharInfo] = useState<CharProps>({
    id: 1,
    name: "",
    status: "",
    species: "",
    image: "",
    type: "",
    gender: "",
    origin: {},
    location: {},
    created: "",
    episode: [],
  });

  useEffect(() => {
    const getOnePageRes = async () => {
      const {
        data: {
          info: { next, prev },
          results,
        },
      } = await getOnePageChars(currentPage);
      // console.log(next);
      setData(results);
      setNext(next);
      prev ? setPrev(prev) : setIsPrevDisabled(true);
    };
    getOnePageRes();
  }, [currentPage]);

  const ListItem = ({ item }: { item: CharProps }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.itemText}>Gender: {item.gender}</Text>
        <Text style={styles.itemText}>Species: {item.species}</Text>
        {item.type ? (
          <Text style={styles.itemText}>Type: {item.type}</Text>
        ) : null}
      </View>
    );
  };

  const handleClickPrev = () => {
    if (prev) {
      setCurrentPage(prev);
      setIsNextDisabled(false);
      return;
    }
    setIsPrevDisabled(true);
  };
  const handleClickNext = () => {
    if (next) {
      setCurrentPage(next);
      setIsPrevDisabled(false);
      return;
    }
    setIsNextDisabled(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <Button
          disabled={isPrevDisabled}
          onPress={handleClickPrev}
          title="Go to previous page"
        />
        <FlatList
          horizontal={true}
          data={data}
          renderItem={({ item }) => <ListItem item={item} />}
        />
        <Button
          disabled={isNextDisabled}
          onPress={handleClickNext}
          title="Go to next page"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    height: 400,
    backgroundColor: "pink",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    backgroundColor: Colors.pink,
    width: Dimensions.get("screen").width,
    marginRight: 20,
  },
  itemImage: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: Colors.green,
    marginTop: 5,
  },
});
