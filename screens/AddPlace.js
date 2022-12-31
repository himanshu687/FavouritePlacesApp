import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceForm from "../components/places/PlaceForm";
import { insertPlaceIntoDB } from "../utils/database";

const AddPlace = ({ navigation }) => {
  const handleCreatePlace = async (place) => {
    await insertPlaceIntoDB(place);

    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={handleCreatePlace} />;
};

export default AddPlace;

const styles = StyleSheet.create({});
