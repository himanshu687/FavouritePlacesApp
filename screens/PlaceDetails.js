import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../utils/colors";
import { fetchPlaceFromDB } from "../utils/database";

const PlaceDetails = ({ route, navigation }) => {
  const selectedPlaceId = route.params.placeId;

  const [placeDetails, setPlaceDetails] = useState();

  console.log(placeDetails);

  const handleShowOnMap = () => {
    navigation.navigate("Map", {
      lat: placeDetails.location.lat,
      lng: placeDetails.location.lng,
    });
  };

  useEffect(() => {
    const getPlace = async () => {
      const place = await fetchPlaceFromDB(selectedPlaceId);
      setPlaceDetails(place);

      navigation.setOptions({
        title: place.title,
      });
    };

    getPlace();
  }, [selectedPlaceId]);

  if (!placeDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={40} color="#ffffff" />
      </View>
    );
  }

  return (
    <ScrollView>
      <Image source={{ uri: placeDetails.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeDetails.address}</Text>
        </View>

        <OutlinedButton icon="map" onPress={handleShowOnMap}>
          View on map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 250,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
