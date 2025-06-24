import * as React from "react";
import {
  ActivityIndicator,
  View,
  Image,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import useFetchModel from "~/hooks/api-hooks/useFetchModel";
import { Button } from "~/components/ui/button";
import {
  BeefIcon,
  CameraIcon,
  ChevronDown,
  ChevronRight,
  Images,
  InfoIcon,
  SquareCodeIcon,
} from "lucide-react-native";
import { cn, formatLabel, formatLabels } from "~/lib/utils";
import { Progress } from "~/components/ui/progress";
import usePostModel from "~/hooks/api-hooks/usePostModel";
import { useImagePicker as useCameraHandler } from "~/hooks/useCameraHandler";
import { useGalleryHandler } from "~/hooks/useGalleryHandler";
import { useColorScheme } from "~/lib/useColorScheme";
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
import { Separator } from "~/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

const howToUse = [
  "You can take a photo or select a photo from the gallery to classify the meat",
  "then the result will be displayed on the screen",
  "and you can retake the photo or select a photo from the gallery to classify the meat again",
];

export default function Screen() {
  const { colorScheme } = useColorScheme();
  const { data, isLoading, error, isSuccess, isError } = useFetchModel({
    limit: 1,
    offset: 2,
  });
  const [openCollapsible, setOpenCollapsible] = React.useState<number | null>(
    null
  );
  const expectedClassNames = React.useMemo(() => {
    if (isSuccess) {
      return formatLabels(
        Object.keys(data?.data.map((item) => item.probabilities)[0])
      );
    }
    return [];
  }, [data, isSuccess]);
  
  const sections = [
    {
      title: "Technologies Used",
      data: ["Tensorflow", "Expo", "FastAPI"],
    },
    {
      title: "Languages Used",
      data: ["Python", "Typescript"],
    },
    {
      title: "Expected Output",
      data: expectedClassNames,
    },
  ];

  const {
    mutateAsync,
    data: result,
    isPending: isProcessing,
    isSuccess: isSuccessPost,
  } = usePostModel();
  
  const camera = useCameraHandler();
  const gallery = useGalleryHandler();

  const captureImages = async () => {
    const photo = await camera.openCamera();
    if (photo) await mutateAsync(photo);
    return photo;
  };
  const pickGalleryImages = async () => {
    const photo = await gallery.openGallery();
    if (photo) await mutateAsync(photo);
    return photo;
  };

  const hasPermission = camera.hasPermission && gallery.hasPermission;
  const capturedImages = camera.capturedImage || gallery.capturedImageFromGallery;
  
  const retakeAndClear = async () => {
    camera.clearCapturedImage();
    captureImages();
  };

  const retakeAndClearGallery = async () => {
    gallery.clearCapturedImageFromGallery();
    pickGalleryImages();
  };


  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" className="text-foreground" />
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

  return (
    <View className="p-6 gap-2  grid place-items-center">
      <Card className="h-full rounded-xl flex justify-center items-center max-w-2xl">
        <Dialog className="absolute top-3 right-4 z-10">
          <DialogTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <InfoIcon size={20} color={"#8a8e94"} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <View className="flex flex-row items-center gap-x-2">
                <BeefIcon color={"#8a8e94"} size={19} />
                <Text
                  className={cn(
                    "text-lg native:text-xl text-foreground font-semibold leading-none tracking-tight"
                  )}
                >
                  Welcome to Meat Classifier
                </Text>
              </View>
              <DialogDescription>
                <Text
                  className={cn(
                    "text-sm native:text-base text-muted-foreground"
                  )}
                >
                  What is this app? this app is a simple app that can classify
                  meat
                </Text>
              </DialogDescription>
              <Separator />
              <View>
                <View className="flex flex-row mb-2 gap-x-2 items-center">
                  <InfoIcon size={16} color={"#8a8e94"} />
                  <Text className="font-semibold ">How to use?</Text>
                </View>
                {howToUse.map((item, index) => (
                  <View key={index} className="flex-row items-center mb-2 ">
                    <Text className="text-muted-foreground mr-2">&bull;</Text>
                    <Text className="text-muted-foreground text-xs">
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </DialogHeader>
            <Separator />
            <View>
              <View className="flex flex-row mb-2 items-center gap-x-2">
                <SquareCodeIcon size={16} color={"#8a8e94"} />
                <Text className="text-base font-bold">
                  The app is powered by
                </Text>
              </View>
              {sections.map((section, sectionIndex) => (
                <Collapsible
                  open={openCollapsible === sectionIndex}
                  onOpenChange={(isOpen) =>
                    setOpenCollapsible(isOpen ? sectionIndex : null)
                  }
                  key={`collapsible-${sectionIndex}`}
                  className="mb-2"
                >
                  <CollapsibleTrigger asChild>
                    <TouchableOpacity className="flex flex-row items-center justify-between py-2 px-1 rounded-md bg-secondary/20">
                      <View className="flex flex-row items-center">
                        {openCollapsible === sectionIndex ? (
                          <ChevronDown size={14} color={"#8a8e94"} />
                        ) : (
                          <ChevronRight color={"#8a8e94"} size={14} />
                        )}
                        <Text className="font-semibold text-sm text-foreground">
                          {section.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="py-2 px-1 border-b border-border">
                    {section.data.map((item, itemIndex) => (
                      <View
                        key={`item-${sectionIndex}-${itemIndex}`}
                        className="flex-row items-center mb-1 ml-4"
                      >
                        <Text className="text-muted-foreground mr-2">
                          &bull;
                        </Text>
                        <Text className="text-muted-foreground text-xs">
                          {item}
                        </Text>
                      </View>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </View>
            <DialogFooter>
              <DialogClose asChild>
                <Button>
                  <Text>OK</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <CardContent
          className={cn(
            "min-h-[224px] relative flex justify-center items-center rounded-xl",
            capturedImages
              ? "m-0"
              : "my-5 mx-4 border-dotted w-[224px] border-accent-foreground bg-accent/40 border"
          )}
        >
          {capturedImages ? (
            <View className="w-full relative rounded-xl overflow-hidden">
              <Image
                source={{ uri: capturedImages.uri }}
                className="h-[224px] w-[224px] rounded-xl"
                resizeMode="cover"
              />

              {/* Processing indicator */}
              {isProcessing && (
                <View className="absolute inset-0 bg-black/50 flex justify-center items-center rounded-xl">
                  <ActivityIndicator
                    size="large"
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                  <Text className="text-white mt-2">Processing...</Text>
                </View>
              )}

              {/* Results */}
              {result && isSuccessPost && (
                <View className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 rounded-xl">
                  <Text className="font-semibold text-white">
                    Prediction Results:
                  </Text>
                  {Object.entries(
                    result.data.raw_probabilities_by_class_name
                  ).map(([key, value], index) => (
                    <View key={index} className="mb-2">
                      <Text
                        className={cn(
                          "text-sm mb-1",
                          key === "segar" && "text-green-300",
                          key === "bukan_daging" && "text-yellow-300",
                          key === "busuk" && "text-red-300"
                        )}
                      >
                        {formatLabel(key)}: {(value * 100).toFixed(1)}%
                      </Text>
                      <Progress
                        value={value * 100}
                        indicatorClassName={cn(
                          key === "segar" && "bg-green-500",
                          key === "bukan_daging" && "bg-yellow-500",
                          key === "busuk" && "bg-red-500"
                        )}
                      />
                    </View>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View className="flex-1 w-full gap-3 justify-center items-center">
              <Images color={"#8a8e94"} size={40} />
              <Text className="text-center text-muted-foreground">
                No photo taken yet
              </Text>
            </View>
          )}
        </CardContent>

        {capturedImages && (
          <CardFooter className="flex flex-col gap-y-2 items-center">
            <Button
              variant={"secondary"}
              onPress={retakeAndClear}
              disabled={!hasPermission || isProcessing}
            >
              <View className="flex flex-row items-center gap-x-3 ">
                <CameraIcon color={"#8a8e94"} size={20} />
                <Text className="text-muted-foreground">
                  {hasPermission
                    ? "Retake from camera"
                    : "Camera permission required"}
                </Text>
              </View>
            </Button>
            <Text className="text-sm text-muted-foreground">
              Or choose from gallery
            </Text>
            <Button
              className="flex flex-row items-center gap-x-3"
              variant={"outline"}
              onPress={retakeAndClearGallery}
              disabled={!hasPermission || isProcessing}
            >
              <View className="flex flex-row items-center gap-x-3 ">
                <Images color={"#8a8e94"} size={20} />
                <Text className="text-muted-foreground">
                  {hasPermission
                    ? "Retake from gallery"
                    : "Gallery permission required"}
                </Text>
              </View>
            </Button>
          </CardFooter>
        )}
        {!capturedImages && (
          <CardFooter className="flex flex-col gap-y-2 w-auto  items-center">
            <Button
              variant={"outline"}
              onPress={captureImages}
              disabled={!hasPermission}
            >
              <View className="flex flex-row items-center gap-x-3 ">
                <CameraIcon color={"#8a8e94"} size={20} />
                <Text className="text-muted-foreground">
                  {hasPermission
                    ? "Open your camera"
                    : "Camera permission required"}
                </Text>
              </View>
            </Button>
            <Text className="text-sm text-muted-foreground">
              Or choose from gallery
            </Text>
            <Button
              className="flex flex-row items-center gap-x-3"
              variant={"secondary"}
              onPress={pickGalleryImages}
              disabled={!hasPermission}
            >
              <View className="flex flex-row items-center gap-x-3 ">
                <Images color={"#8a8e94"} size={20} />
                <Text className="text-muted-foreground">
                  {hasPermission
                    ? "Open your gallery"
                    : "Gallery permission required"}
                </Text>
              </View>
            </Button>
          </CardFooter>
        )}
      </Card>
    </View>
  );
}
