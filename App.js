import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./utils/colors";
import MapScreen from "./screens/MapScreen";
import { useCallback, useEffect, useState } from "react";
import { init } from "./utils/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "./screens/PlaceDetails";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setIsDbInitialized(true);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  // const hideSplashScreen = useCallback(async () => {
  //   console.log("inside hide function");
  //   await SplashScreen.hideAsync();
  // }, []);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (isDbInitialized) {
      hideSplashScreen();
    }
  }, [isDbInitialized]);

  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AllPlaces"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          {/* SCREEN #1 */}
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Favourite Places",
              headerTitleAlign: "center",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />

          {/* SCREEN #2 */}
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add Place",
              headerTitleAlign: "center",
            }}
          />

          {/* SCREEN #3 */}
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{
              headerTitleAlign: "center",
            }}
          />

          {/* SCREEN #4 */}
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: "Place Details",
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create();
