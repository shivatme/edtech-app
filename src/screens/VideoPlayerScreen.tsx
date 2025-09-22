import React from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppButton from "../components/AppButton";
import { RootTabParamList } from "../navigation/TabNavigation";

type VideoPlayerPageNavigationProp = NativeStackNavigationProp<
  RootTabParamList,
  "VideoPlayerScreen"
>;

export default function VideoPlayerScreen() {
  const navigation = useNavigation<VideoPlayerPageNavigationProp>();

  const videoSource = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
    player.timeUpdateEventInterval = 1;
  });

  return (
    <View style={styles.container}>
      <VideoView style={styles.video} player={player} />
      <View style={styles.controls}>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.controls}>
        <AppButton
          title="Go WEB"
          onPress={() => navigation.navigate("WebViewScreen")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  video: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  controls: { marginTop: 10 },
});
