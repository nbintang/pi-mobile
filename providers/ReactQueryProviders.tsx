import { Platform, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import {
  onlineManager,
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AppState, AppStateStatus } from "react-native";

onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => setOnline(!!state.isConnected))
);

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: Platform.OS === "web",
      refetchOnReconnect: true,
      refetchInterval: 1000 * 60 * 30,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

export function setupReactQueryListeners() {
  return AppState.addEventListener("change", onAppStateChange);
}

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </QueryClientProvider>
  );
}