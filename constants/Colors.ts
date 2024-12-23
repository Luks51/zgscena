/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#016eb2";
const tintColorDark = "#4dbafe";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    secondaryBackground: "rgba(255, 255, 255, 0.7)",
    tint: tintColorLight,
    tintSecondary: "#1180c5",
    icon: "#687076",
    accent: "#FBD041",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    secondaryBackground: "rgba(255, 255, 255, 0.7)",
    tint: tintColorDark,
    tintSecondary: "#1180c5",
    icon: "#9BA1A6",
    accent: "#FBD041",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
