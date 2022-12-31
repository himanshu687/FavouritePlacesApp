import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, color, size, onPress }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) => [
          Platform.OS === "ios" && pressed && styles.pressed,
        ]}
        android_ripple={{ color: color / 2   }}
        onPress={onPress}
      >
        <View style={styles.buttonInnerContainer}>
          <Ionicons name={icon} color={color} size={size} />
        </View>
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    // margin: 4,
    overflow: "hidden",
    borderRadius: 20,
  },
  buttonInnerContainer: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
