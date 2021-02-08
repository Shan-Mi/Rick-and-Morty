import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Dimensions, Image } from "react-native";
import { FlatList, Platform, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { getOnePageChars } from "../Api";
import Status from "../components/Status";
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

  useEffect(() => {
    const getOnePageRes = async () => {
      const {
        data: {
          info: { next, prev },
          results,
        },
      } = await getOnePageChars(currentPage);

      setData(results);
      setNext(next);
      prev ? setPrev(prev) : setIsPrevDisabled(true);
    };
    getOnePageRes();
  }, [currentPage]);

  const ListItem = ({ item, index }: { item: CharProps; index: number }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <View style={styles.itemHeader}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.textsRight}>
            <Text style={styles.itemText}>
              Gender: {item.gender?.toLocaleUpperCase()}
            </Text>
            <Text style={styles.itemText}>Species: {item.species}</Text>
            <Text style={styles.itemText}>Id: {item.id}</Text>
            <Text style={styles.itemText}>
              Status:
              <Status status={item.status} />
            </Text>
          </View>
        </View>
        {item.type ? (
          <Text style={styles.itemText}>Type: {item.type}</Text>
        ) : null}
        <Text style={styles.itemIndex}>No: {index + 1} on this Page</Text>
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
      <Button
        disabled={isPrevDisabled}
        onPress={handleClickPrev}
        title="Go to previous page"
      />
      <ScrollView
        horizontal={true}
        // contentContainerStyle={{ width: `${100 * 30}%` }}
        showsHorizontalScrollIndicator={true}
        scrollEventThrottle={200}
        decelerationRate="fast"
        pagingEnabled>
        <FlatList
          horizontal={true}
          data={data}
          scrollsToTop={true}
          renderItem={({ item, index }) => (
            <ListItem item={item} index={index} />
          )}
        />
      </ScrollView>
      <Button
        disabled={isNextDisabled}
        onPress={handleClickNext}
        title="Go to next page"
      />
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
    paddingHorizontal: 20,
    // alignItems: "center",
    // marginRight: 20,
  },
  itemHeader: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  textsRight: {
    backgroundColor: "transparent",
    justifyContent: "space-around",
  },
  status: {
    color: "red",
  },
  itemTitle: {
    fontSize: 20,
    fontFamily: "PressStart2P_400Regular",
    paddingVertical: 15,
    textAlign: "center",
  },
  itemImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  itemText: {
    color: Colors.green,
    marginTop: 5,
    fontSize: 18,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  itemIndex: {
    position: "absolute",
    bottom: 5,
    alignSelf: "center",
  },
});
