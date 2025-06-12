import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appearance, Image, Platform, StyleSheet, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { setupReactQueryListeners } from "~/providers/ReactQueryProviders";
import { ReactQueryProvider } from "../../providers/ReactQueryProviders";
import { LogBox } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import Toast from "react-native-toast-message"; 
import { BeefIcon } from "lucide-react-native";
LogBox.ignoreLogs([
  "Invalid prop `style` supplied to `React.Fragment`", // exact warning
]);
const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
});
export {
  // Catch any errors thrown by the Layout component.
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
  // const [appIsReady, setAppIsReady] = React.useState(false);

  // React.useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   }
  //   prepare();
  // }, []);

  // const onLayoutRootView = React.useCallback(() => {
  //   if (appIsReady) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return (
  //     <View
  //       onLayout={onLayoutRootView}
  //       className={cn(
  //         "flex-1 justify-center items-center",
  //         isDarkColorScheme ? "bg-black" : "bg-white"
  //       )}
  //     >
  //       <BeefIcon className="mb-4 " size={50} color={"red"} />
  //       <Text
  //         className={cn(
  //           "text-2xl font-bold",
  //           isDarkColorScheme ? "text-white" : "text-black"
  //         )}
  //       >
  //         Meat Classifier
  //       </Text>
  //     </View>
  //   );
  // }

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
                <Text className="text-lg font-semibold">
                  Meat Classifier{" "}
                  <BeefIcon className="mb-4 " size={20} color={"red"} />
                </Text>
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
