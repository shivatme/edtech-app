import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

type AppButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: "black" | "white";
  style?: object;
};

export default function AppButton({
  title,
  onPress,
  variant = "black",
  style,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === "black" ? styles.black : styles.white,
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          variant === "black" ? styles.textWhite : styles.textBlack,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  black: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#000",
  },
  white: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  textWhite: {
    color: "#fff",
  },
  textBlack: {
    color: "#000",
  },
});
