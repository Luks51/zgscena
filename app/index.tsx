import { Redirect, useRootNavigationState } from "expo-router";
import "@expo/metro-runtime";

const App = () => {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href={"/(tabs)/home"} />;
};

export default App;