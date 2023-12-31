import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import UserIcon from "../components/UserIcon/UserIcon";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "../config/gluestack-ui.config";

import { store } from "../redux/store";
import { Provider } from "react-redux";

// import Logo from "../assets/images/conexao-inclusao-jaragua-icone-azul.png";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(home)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <Stack>
          <Stack.Screen
            name="(home)/index"
            options={{
              headerTitle: "",
              headerRight: () => <UserIcon />,
              // headerLeft: () => <Image source={Logo} />,
            }}
          />
          <Stack.Screen
            name="(signin)/signin"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(signup)/signup"
            options={{ headerShown: false }}
          />
        </Stack>
      </GluestackUIProvider>
    </Provider>
    // </ThemeProvider>
  );
}
