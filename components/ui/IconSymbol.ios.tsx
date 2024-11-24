// This file is a fallback for using MaterialIcons on Android and web.

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "notifications.none": "notifications-none",
  "calendar.today": "calendar-today",
  people: "emoji-people",
  bookmark: "bookmark-border",
  review: "rate-review",
  "arrow.right": "arrow-forward",
  search: "search",
  "location.pin": "location-pin",
  "calendar.month": "calendar-month",
  euro: "euro",
  "local.fire.department": "local-fire-department",
  "sports.soccer": "sports-soccer",
  movie: "movie",
  fastfood: "fastfood",
  "music.note": "music-note",
  "tehater.comedy": "theater-comedy",
  "star.fill": "star",
  "star.empty": "star-border",
  "arrow.left": "arrow-back",
  "more.vert": "more-vert",
  explore: "explore",
  "event.note": "event-note",
  directions: "directions",
  "calendar.add": "edit-calendar"
} as Partial<
  Record<
    import("expo-symbols").SymbolViewProps["name"],
    React.ComponentProps<typeof MaterialIcons>["name"]
  >
>;
const MAPPINGFONTAWSOME = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  user: "user-large",
} as Partial<
  Record<
    import("expo-symbols").SymbolViewProps["name"],
    React.ComponentProps<typeof FontAwesome>["name"]
  >
>;

export type IconSymbolName = keyof typeof MAPPING;
export type IconSymbolNameFontAwesome = keyof typeof MAPPINGFONTAWSOME;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}

export function IconSymbolFontAwesome({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolNameFontAwesome;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPINGFONTAWSOME[name]}
      style={style}
    />
  );
}
