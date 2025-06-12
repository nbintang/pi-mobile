import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "~/components/ui/text";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 justify-center items-center p-6">
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text className="text-xl font-bold mb-4">This screen doesn't exist.</Text>

      <Link href="/">
        <Text className="text-blue-500 underline">Go to home screen!</Text>
      </Link>
    </View>
  );
}
