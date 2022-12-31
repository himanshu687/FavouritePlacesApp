import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../utils/colors";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
  hasServicesEnabledAsync,
} from "expo-location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { getAddress, getMapPreview } from "../../utils/location";

const LocationPicker = ({ onPickLocation }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [pickedLocation, setPickedLocation] = useState();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = { ...route.params };
      // mapPickedLocation = {lat: route.params.lat, lng: route.params.lng}
      setPickedLocation(mapPickedLocation);
    }
  }, [isFocused, route]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onPickLocation({ ...pickedLocation, address });
      }
    };

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const isLocationEnabled = await hasServicesEnabledAsync();
    if (!isLocationEnabled) {
      Alert.alert(
        "Location Error!",
        "Please turn on your device location to use this feature."
      );
      return;
    }

    const location = await getCurrentPositionAsync();

    console.log("Location: ", location);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <>
            {/* <Image
              style={styles.image}
              source={{
                uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
              }}
            /> */}
            <Text style={{ fontWeight: "bold" }}>LOCATED.</Text>
            <Text style={{ fontWeight: "bold" }}>
              But preview is not available!
            </Text>
          </>
        ) : (
          <Text>No Location Picked</Text>
        )}
      </View>

      <View style={styles.actions}>
        <View style={styles.buttonContainer}>
          <OutlinedButton icon="location" onPress={getLocationHandler}>
            Locate User
          </OutlinedButton>
        </View>
        <View style={styles.buttonContainer}>
          <OutlinedButton icon="map" onPress={pickOnMapHandler}>
            Pick on Map
          </OutlinedButton>
        </View>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
