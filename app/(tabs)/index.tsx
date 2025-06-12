import * as React from "react";
import { ActivityIndicator, View, Image } from "react-native";
import { CameraView } from "expo-camera";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import useFetchModel from "~/hooks/useFetchModel";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  BeefIcon,
  CameraIcon,
  FlipHorizontalIcon,
  X,
} from "lucide-react-native";
import { useCameraWithProcessor } from "~/hooks/useCameraWithProcessor";
import { cn } from "~/lib/utils";
import { Progress } from "~/components/ui/progress";
import Toast from "react-native-toast-message";
export default function Screen() {
  const [changeModel, setChangeModel] = React.useState<number>(1);

  const [initialModelLoaded, setInitialModelLoaded] = React.useState(false);

  const {
    data,
    isLoading,
    error,
    isSuccess,
    isError,
    isFetching,
    refetch,
    isRefetching,
  } = useFetchModel({
    version: changeModel,
  });
  const {
    // Camera states
    facing,
    showCamera,
    capturedImage,
    isCapturing,
    cameraRef,
    hasPermission,
    // Actions
    toggleCameraFacing,
    openCamera,
    closeCamera,
    captureAndProcess,
    retakeAndClear,
    isProcessing,
    result,
  } = useCameraWithProcessor(
    data?.data?.model_info?.model_version_used || changeModel
  );
  React.useEffect(() => {
    if (changeModel) {
      refetch(); // panggil refetch secara eksplisit
    }
  }, [changeModel]);
  React.useEffect(() => {
    if (isSuccess && !isFetching && !isRefetching && data) {
      if (initialModelLoaded) {
        Toast.show({
          type: "success",
          text1: "Model is ready!",
          text2: `Successfully set Model Version ${data.data.model_info.model_version_used}`,
        });
      } else {
        setInitialModelLoaded(true);
      }
    }
    // No need to include changeModel here, as the toast condition is tied to fetch success after initial load
  }, [isSuccess, isFetching, isRefetching, data, initialModelLoaded]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || isError) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-red-500">Gagal memuat info model</Text>
      </View>
    );
  }

  if (!isSuccess || !data) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text>Tidak ada data tersedia</Text>
      </View>
    );
  }

  // Camera view
  if (showCamera) {
    return (
      <View className="flex-1">
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing}>
          <View className="flex-1 justify-between p-6">
            {/* Top controls */}
            <View className="flex-row justify-between items-center">
              <Button
                onPress={closeCamera}
                variant="outline"
                size="sm"
                className="bg-black/50"
              >
                <X color="white" size={20} />
              </Button>

              <Button
                onPress={toggleCameraFacing}
                variant="outline"
                size="sm"
                className="bg-black/50"
              >
                <FlipHorizontalIcon color="white" size={20} />
              </Button>
            </View>

            {/* Bottom controls */}
            <View className="flex-row justify-center items-start h-16">
              <Button
                onPress={captureAndProcess}
                disabled={isCapturing}
                className="w-19 h-19  rounded-full bg-white"
                variant="outline"
              >
                {isCapturing ? (
                  <ActivityIndicator color="#333" />
                ) : (
                  <CameraIcon color="#333" size={20} />
                )}
              </Button>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View className="p-6 gap-2 grid place-items-center">
           {(isFetching || isRefetching) && (
          <View className="absolute inset-0 bg-black/50 z-50 flex justify-center items-center rounded-md">
            <ActivityIndicator size="large" color="white" />
            <Text className="text-white mt-2">Changing model...</Text>
          </View>
        )}
      <Card className="h-full relative">
        <CardHeader className="flex flex-row justify-between items-center gap-y-7 ">
          <Text className="text-lg font-bold">
            Model Version: {data.data.model_info.model_version_used}
          </Text>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size={"sm"}>
                <Text>Select Versions</Text>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Select Model Versions</DialogTitle>
                <DialogDescription>
                  Select the model version you want to use
                </DialogDescription>
                <Text className="text-muted-foreground font-semibold">
                  Kelas Output:
                </Text>
                {data.data.model_info.output_class_names.map((name, index) => (
                  <Text key={index} className="mb-1 text-muted-foreground">
                    {">"} {name}{" "}
                    <BeefIcon className="mb-4 " size={10} color={"red"} />
                  </Text>
                ))}
              </DialogHeader>
              <DialogFooter className="">
                {[...data.meta.available_model_versions]
                  .reverse()
                  .map((version, index) => (
                    <DialogClose key={index} asChild>
                      <Button
                        onPress={async () => {
                          setChangeModel(version);
                        }}
                        variant={"outline"}
                      >
                        <Text>Version {version}</Text>
                      </Button>
                    </DialogClose>
                  ))}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
   
        <CardContent
          className={cn(
            "min-h-[490px]  relative  flex justify-center items-center rounded-md mx-4",
            !capturedImage &&
              "border-dotted border-accent-foreground bg-accent/40 border "
          )}
        >
          {capturedImage ? (
            <View className="flex-1 w-full">
              <Image
                source={{ uri: capturedImage.uri }}
                className=" rounded-md"
                resizeMode="cover"
                style={{ flex: 1 }}
              />

              {/* Processing indicator */}
              {isProcessing && (
                <View className="absolute inset-0 bg-black/50 flex justify-center items-center rounded-md">
                  <ActivityIndicator size="large" color="white" />
                  <Text className="text-white mt-2">Processing...</Text>
                </View>
              )}

              {/* Results */}
              {result && (
                <View className="my-4  rounded-md">
                  <Text className="font-semibold">Prediction Results:</Text>
                  {/* Iterate over raw_probabilities_by_class_name to display predictions */}
                  {Object.entries(result.raw_probabilities_by_class_name).map(
                    ([key, value], index) => (
                      <View key={index} className="mb-2">
                        <Text
                          className={cn(
                            "text-sm mb-1",
                            key === "Segar" ? "text-green-500" : "text-red-500"
                          )}
                        >
                          {key}: {(value * 100).toFixed(1)}%
                        </Text>
                        <Progress value={value * 100} />
                      </View>
                    )
                  )}
                </View>
              )}

              <Button
                onPress={retakeAndClear}
                variant="outline"
                className="w-full mt-3 flex flex-row items-center gap-x-2"
              >
                <Text className="text-muted-foreground">Retake Photo</Text>
                <CameraIcon color={"#8a8e94"} size={20} />
              </Button>
            </View>
          ) : (
            <Button
              className="flex flex-row items-center gap-x-3"
              variant={"outline"}
              onPress={openCamera}
              disabled={!hasPermission}
            >
              <CameraIcon color={"#8a8e94"} size={20} />
              <Text className="text-muted-foreground">
                {hasPermission
                  ? "Open your camera"
                  : "Camera permission required"}
              </Text>
            </Button>
          )}
        </CardContent>
      </Card>
    </View>
  );
}
