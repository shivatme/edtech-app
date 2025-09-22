import { NavigationContainer } from "@react-navigation/native";
import { LogBox, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TabNavigator from "./src/navigation/TabNavigation";

LogBox.ignoreLogs([
  "expo-notifications: Android Push notifications (remote notifications)",
]);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Notification permissions not granted!");
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.HIGH,
          sound: "default",
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    setupNotifications();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
