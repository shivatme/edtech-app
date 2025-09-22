import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const initNotifications = async () => {
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

export const triggerNotification = async (
  message: string,
  options?: { delaySeconds?: number; title?: string }
): Promise<string> => {
  const title = options?.title ?? "EdTech Notification";
  const delaySeconds = options?.delaySeconds ?? 0;

  const content: Notifications.NotificationContentInput = {
    title,
    body: message,
    sound: "default",
    priority: Notifications.AndroidNotificationPriority.HIGH,
    sticky: false,
    vibrate: [0, 250, 250, 250],
  };

  let trigger: Notifications.NotificationTriggerInput | null;

  if (delaySeconds > 0) {
    trigger = {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: delaySeconds < 1 ? 1 : delaySeconds, // minimum 1 sec
      repeats: false,
    };
  } else {
    trigger = null;
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content,
    trigger,
  });

  return notificationId;
};
