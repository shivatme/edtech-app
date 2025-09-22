import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { LogBox, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TabNavigator, { RootTabParamList } from "./src/navigation/TabNavigation";

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
  const navigationRef = useRef<NavigationContainerRef<RootTabParamList>>(null);
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

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data as {
          screen?: keyof RootTabParamList;
          videoUrl?: string;
        };

        const screen = data.screen;
        const videoUrl = data.videoUrl;

        if (screen && navigationRef.current) {
          if (screen === "VideoPlayerScreen") {
            navigationRef.current.navigate(screen, { videoUrl });
          } else if (screen === "WebViewScreen") {
            navigationRef.current.navigate(screen);
          }
        }
      }
    );
    return () => subscription.remove();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
