import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootTabParamList } from "../navigation/TabNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Slider from "@react-native-community/slider";

const { width } = Dimensions.get("window");

// MARK: - Video Streams
// List of video streams that user can switch between
const videoStreams = [
  {
    id: "1",
    title: "Stream 1",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "2",
    title: "Stream 2",
    url: "https://test-streams.mux.dev/pts_shift/master.m3u8",
  },
  {
    id: "3",
    title: "Stream 3",
    url: "https://test-streams.mux.dev/tos_ismc/main.m3u8",
  },
];

// MARK: - Types
type VideoPlayerNavigationProp = NativeStackNavigationProp<
  RootTabParamList,
  "VideoPlayerScreen"
>;
type VideoPlayerRouteProp = RouteProp<RootTabParamList, "VideoPlayerScreen">;

// MARK: - Component
export default function VideoPlayerScreen() {
  const navigation = useNavigation<VideoPlayerNavigationProp>();
  const route = useRoute<VideoPlayerRouteProp>();

  // MARK: - State
  const [currentStream, setCurrentStream] = useState(
    videoStreams.find((video) => video.url === route?.params?.videoUrl) ||
      videoStreams[0]
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isFocused = useIsFocused();

  // MARK: - Player Setup
  const player = useVideoPlayer(currentStream.url, (player) => {
    player.loop = true;
    player.play();
    player.timeUpdateEventInterval = 1;
    player.volume = isMuted ? 0 : 1;
  });

  const videoRef = useRef<VideoView>(null);

  // MARK: - Control Functions
  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    player.volume = isMuted ? 1 : 0;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      videoRef.current?.exitFullscreen();
    } else {
      videoRef.current?.enterFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const switchStream = (stream: (typeof videoStreams)[0]) => {
    setCurrentStream(stream);
    setIsPlaying(true);
  };

  // MARK: - Effects
  // Handle loading, duration, and current time
  useEffect(() => {
    const interval = setInterval(() => {
      if (!player) return;
      const status = player.status;

      if (status && status === "readyToPlay") {
        setIsLoading(false);
      }
      if (status && status === "loading") {
        setIsLoading(true);
      }

      setDuration(player.duration);
      setCurrentTime(player.currentTime);
    }, 100);

    return () => clearInterval(interval);
  }, [player]);

  // Pause when screen is not focused
  useEffect(() => {
    if (!player) return;

    if (isFocused) {
      player.play();
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
  }, [isFocused, player]);

  // Switch stream if navigation param changes
  useEffect(() => {
    const stream =
      videoStreams.find((video) => video.url === route?.params?.videoUrl) ||
      videoStreams[0];

    switchStream(stream);

    if (route?.params?.videoUrl) {
      navigation.setParams({ videoUrl: undefined });
    }
  }, [route?.params?.videoUrl]);

  // MARK: - UI
  return (
    <View style={styles.container}>
      {/* MARK: Video Player */}
      <View>
        <VideoView
          style={styles.video}
          player={player}
          nativeControls={false}
          ref={videoRef}
          fullscreenOptions={{
            enable: true,
            orientation: "landscape",
            autoExitOnRotate: true,
          }}
          onFullscreenExit={() => setIsFullscreen(false)}
        />
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
      </View>

      {/* MARK: Time & Progress Slider */}
      <View style={{ alignItems: "center", width: "100%", marginVertical: 10 }}>
        {/* Current Time & Duration */}
        <View style={styles.timeRow}>
          <Text style={{ color: "white" }}>{formatTime(currentTime)}</Text>
          <Text style={{ color: "white" }}>{formatTime(duration)}</Text>
        </View>

        {/* Seek Slider */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration || 0}
          value={currentTime || 0}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#555"
          thumbTintColor="white"
          onValueChange={(time) => setCurrentTime(time)}
          onSlidingComplete={(time) => {
            const current = player.currentTime;
            player.seekBy(time - current);
          }}
        />
      </View>

      {/* MARK: Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => player.seekBy(-10)}
          style={styles.controlBtn}
        >
          <MaterialIcons name="replay-10" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause} style={styles.controlBtn}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={30}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => player.seekBy(10)}
          style={styles.controlBtn}
        >
          <MaterialIcons name="forward-10" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleFullscreen}>
          <Ionicons name="expand" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleMute} style={styles.controlBtn}>
          <Ionicons
            name={isMuted ? "volume-mute" : "volume-high"}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* MARK: Stream List */}
      <View style={styles.streamListContainer}>
        <Text style={styles.streamListTitle}>More Streams</Text>
        <FlatList
          horizontal
          data={videoStreams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.streamItem,
                item.id === currentStream.id && styles.activeStream,
              ]}
              onPress={() => switchStream(item)}
            >
              <Text
                style={[
                  styles.streamText,
                  item.id === currentStream.id && styles.activeStreamText,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

// MARK: - Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    width: width,
    height: 320,
    backgroundColor: "#000",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  controlBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    borderRadius: 35,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 40,
    marginBottom: 5,
  },
  slider: {
    width: width - 40,
    height: 40,
  },
  streamListContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
  },
  streamListTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "700",
  },
  streamItem: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#222",
    borderRadius: 25,
    marginRight: 12,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  streamText: {
    color: "#fff",
    fontWeight: "500",
  },
  activeStream: {
    backgroundColor: "#fff",
  },
  activeStreamText: {
    color: "#000",
    fontWeight: "700",
  },
});

// MARK: - Helpers
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};
