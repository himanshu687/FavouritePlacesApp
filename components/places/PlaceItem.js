import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../../utils/colors";

const PlaceItem = ({ place, onSelect }) => {
  return (
    <View style={styles.itemContainer}>
      <Pressable
        onPress={onSelect.bind(this, place.id)}
        android_ripple={{ color: Colors.primary500 / 2 }}
        style={({ pressed }) => [
          styles.item,
          pressed && Platform.OS === "ios" && styles.pressed,
        ]}
      >
        <Image style={styles.image} source={{ uri: place.imageUri }} />

        <View style={styles.info}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place.address}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  itemContainer: {
    overflow: "hidden",
    marginVertical: 12,
    borderRadius: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    height: 100,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
