import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppButton from "../components/AppButton";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  triggerNotification,
  triggerVideoNotification,
} from "../utils/NotificationService";
import { RootTabParamList } from "../navigation/TabNavigation";
import { Ionicons } from "@expo/vector-icons";

// MARK: - Types
type WebViewPageNavigationProp = NativeStackNavigationProp<
  RootTabParamList,
  "WebViewScreen"
>;

// MARK: - Component
export default function WebViewScreen() {
  // MARK: State
  const [loading, setLoading] = useState(true);
  const webviewRef = useRef<WebView>(null);

  // MARK: Handlers
  const handleWebViewLoad = () => {
    setLoading(false);

    // Trigger notification after page load
    triggerNotification("Website has finished loading!", {
      title: "Website Load Complete",
    });
  };

  const reloadWebView = () => {
    setLoading(true);
    webviewRef.current?.reload();
  };

  // MARK: UI
  return (
    <SafeAreaView style={styles.container}>
      {/* MARK: WebView Container */}
      <View style={styles.webviewContainer}>
        {/* Loader overlay */}
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}

        <WebView
          ref={webviewRef}
          source={{ uri: "https://houseofedtech.in/" }}
          style={styles.webview}
          onLoadEnd={handleWebViewLoad}
        />

        {/* Reload button */}
        <TouchableOpacity style={styles.reloadButton} onPress={reloadWebView}>
          <Ionicons name="reload" size={18} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* MARK: Notification Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonContainerRow}>
          <AppButton
            title="Notification 1"
            variant="white"
            onPress={() =>
              triggerNotification("This is Notification 1", { delaySeconds: 1 })
            }
            style={{ flex: 1 }}
          />
          <AppButton
            title="Notification 2"
            variant="white"
            onPress={() =>
              triggerNotification("This is Notification 2", { delaySeconds: 3 })
            }
            style={{ flex: 1 }}
          />
        </View>

        <AppButton
          variant="white"
          title="Trigger Video Notification"
          onPress={() => triggerVideoNotification()}
        />
      </View>
    </SafeAreaView>
  );
}

// MARK: - Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  webviewContainer: { flex: 1, position: "relative" },
  webview: { flex: 1 },
  reloadButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    padding: 7,
    borderRadius: 20,
    zIndex: 1,
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 5,
    margin: 5,
  },
  buttonContainerRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 5,
  },
});
