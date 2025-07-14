import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Link, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  ActivityIndicator, Appearance, Platform, View
} from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { ReactQueryProvider } from "../../providers/ReactQueryProviders";
import { LogBox } from "react-native";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import Toast from "react-native-toast-message";
import { BeefIcon } from "lucide-react-native";

LogBox.ignoreLogs(["Invalid prop `style` supplied to `React.Fragment`"]);
const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});
// SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();
  const [appIsReady, setAppIsReady] = React.useState(false);
  React.useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View
        onLayout={onLayoutRootView}
        className={cn(
          "flex-1 justify-center gap-y-3 items-center",
          isDarkColorScheme ? "bg-black" : "bg-white"
        )}
      >
        <BeefIcon className=" " size={50} color={"#570d14"} />
        <Text
          className={cn(
            "text-2xl font-bold",
            isDarkColorScheme ? "text-white" : "text-black"
          )}
        >
          Meat Classifier
        </Text>
        <View className=" flex items-center flex-row gap-x-2">
          <Text
            className={cn("text-lg font-semibold", "text-muted-foreground")}
          >
            Loading...
          </Text>
          <ActivityIndicator size="small" color={"#8a8e94"} />
        </View>
      </View>
    );
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <ReactQueryProvider>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerRight: () => <ThemeToggle />,
              headerLeft: () => (
                <Link href={"/(tabs)"} asChild>
                  <View className="flex-row-reverse gap-x-2 items-center ">
                    <Text className="text-lg font-semibold">
                      Meat Classifier{" "}
                    </Text>
                    <BeefIcon size={20} color={"#570d14"} />
                  </View>
                </Link>
              ),
              headerTitle: "", // optional: remove default title if needed
            }}
          />
        </Stack>
        <PortalHost />
      </ReactQueryProvider>
      <Toast />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}

function noop() {}
