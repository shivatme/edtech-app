import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { WebView } from "react-native-webview";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppButton from "../components/AppButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { triggerNotification } from "../utils/NotificationService";
import { RootTabParamList } from "../navigation/TabNavigation";

type WebViewPageNavigationProp = NativeStackNavigationProp<
  RootTabParamList,
  "WebViewScreen"
>;

export default function WebViewScreen() {
  const navigation = useNavigation<WebViewPageNavigationProp>();
  const [loading, setLoading] = useState(true);
  const webviewRef = useRef<WebView>(null);

  const handleWebViewLoad = () => {
    setLoading(false);
    triggerNotification("Website has finished loading!", {
      title: "Website Load Complete",
    });
  };

  const reloadWebView = () => {
    setLoading(true);
    webviewRef.current?.reload();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webviewContainer}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}

        <WebView
          ref={webviewRef}
          source={{ uri: "https://houseofedtech.in/" }}
          style={styles.webview}
          onLoadEnd={handleWebViewLoad}
        />
      </View>

      <View style={styles.buttonContainer}>
        <AppButton title="Reload WebView" onPress={reloadWebView} />
        <AppButton
          title="Trigger Notification 1"
          onPress={() =>
            triggerNotification("This is Notification 1", { delaySeconds: 1 })
          }
        />
        <AppButton
          title="Trigger Notification 2"
          onPress={() =>
            triggerNotification("This is Notification 2", { delaySeconds: 3 })
          }
        />
        <AppButton
          title="Go to Video Player"
          onPress={() => navigation.navigate("VideoPlayerScreen")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  webviewContainer: { flex: 1, position: "relative" },
  webview: { flex: 1 },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  buttonContainer: {
    padding: 10,
    paddingBottom: 20,
    flexDirection: "column",
    gap: 10,
  },
});
