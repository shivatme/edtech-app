# React Native (Expo) Assignment

## Overview

This Expo React Native app demonstrates:

1. **WebView Integration** – Embed a website inside the app.
2. **Local Notifications** – Trigger notifications based on user interactions and WebView load events.
3. **HLS Video Player** – Play HLS video streams with custom controls and multiple stream support.

The app consists of **two main pages**:

- **WebView + Notifications**
- **Video Player (HLS Playback)**

---

## Features

### WebView Page

- Loads the website: [https://houseofedtech.in/](https://houseofedtech.in/)
- Two buttons trigger **distinct local notifications** with configurable delay (1–3 seconds).
- One button to trigger **video player** notification.
- Notification triggers **when the WebView finishes loading** (bonus implemented).
- Reload button to refresh the page.

### Video Player Page

- Plays an **HLS video stream**: `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`
- Custom controls:
  - Play / Pause
  - Seek backward / forward (10s)
  - Mute / Unmute
  - Fullscreen toggle
- Supports **multiple video streams** with a horizontal scrollable list.
- Notification tap can **open the Video Player page** with a specific stream URL.

### Navigation

- Smooth navigation between WebView and Video Player pages using React Navigation.
- Navigation can also be triggered from **notifications**.

---

## Bonus Implementations

- Notification on **WebView load complete**
- **Custom video controls** (seek, skip, mute)
- **Multiple video streams**
- **Notification tap** opens Video Player page

---

## Installation

### Option 1: Run from Source

1.  **Clone the repository**

```bash
git clone https://github.com/shivatme/edtech-app
cd edtech-app
```

2.  **Install dependencies**

```bash
npm install
#or
yarn install
```

3.  **Start the app**

```bash
npx expo start
```

Open the app in **Expo Go** on your device or simulator.

### Option 2: Install APK (Android only)

- An **APK file** is included in the repository (or attached separately).
- Transfer the APK to your Android device and install it.
- Make sure **“Install from unknown sources”** is enabled in device settings.

---

## Usage

- Open the **WebView Page** to view the website.
- Click **Notification 1** or **Notification 2** buttons to see delayed local notifications.
- Reload the page using the **reload button**.
- Tap a notification to navigate to the **Video Player page**.
- On the **Video Player Page**, use controls to play, pause, mute, or switch streams.

---

## Technologies Used

- React Native (Expo)
- React Navigation
- react-native-webview
- expo-video
- expo-notifications

---

## Notes

- Tested on **Android** using Expo Go.
- All major bonus features have been implemented.

---

## Author

**Shivam Tiwari**  
React Native Developer
