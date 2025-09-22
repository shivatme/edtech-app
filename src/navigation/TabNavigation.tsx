import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WebViewScreen from "../screens/WebViewScreen";
import VideoPlayerScreen from "../screens/VideoPlayerScreen";
import { Ionicons } from "@expo/vector-icons";

export type RootTabParamList = {
  WebViewScreen: undefined;
  VideoPlayerScreen: { videoUrl?: any };
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName =
          route.name === "WebViewScreen" ? "globe-outline" : "videocam-outline";

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Ionicons
              name={iconName}
              size={26}
              color={isFocused ? "#ffffff" : "#999999"}
            />
            <Text style={[styles.tabLabel, isFocused && styles.focusedLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{ tabBarLabel: "WebView" }}
      />
      <Tab.Screen
        name="VideoPlayerScreen"
        component={VideoPlayerScreen}
        options={{ tabBarLabel: "Video" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1e1e1e",
    paddingVertical: Platform.OS === "ios" ? 20 : 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
    elevation: 15,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#999999", // inactive grey
    marginTop: 4,
  },
  focusedLabel: {
    color: "#ffffff", // active white
    fontWeight: "bold",
  },
});
