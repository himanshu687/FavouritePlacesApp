import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../utils/colors";

const Button = ({ children, onPress }) => {
  return (
    <Pressable
      android_ripple={{ color: Colors.primary800 / 2 }}
      style={({ pressed }) => [
        styles.button,
        pressed && Platform.OS === "ios" && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 16,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.primary50,
    fontWeight: "bold",
  },
});
