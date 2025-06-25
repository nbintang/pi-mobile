import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  BeefIcon,
  ChevronDown,
  ChevronRight,
  InfoIcon,
  SquareCodeIcon,
} from "lucide-react-native";
import { Button } from "./ui/button";
import { Text } from "~/components/ui/text";
import { TouchableOpacity, View } from "react-native";
import { cn, formatLabels } from "../lib/utils";

const DialogInformation = ({
  isSuccess,
  data,
}: {
  isSuccess: boolean;
  data: any;
}) => {
  const [openCollapsible, setOpenCollapsible] = React.useState<number | null>(
    null
  );
  const [openCollapsible2, setOpenCollapsible2] = React.useState<number | null>(
    null
  );
  const expectedClassNames = React.useMemo(() => {
    if (isSuccess) {
      return formatLabels(
        Object.keys(data?.data.map((item: any) => item.probabilities)[0])
      );
    }
    return [];
  }, [data, isSuccess]);
  const expectedOutput = [
    {
      title: "Expected Output",
      data: expectedClassNames,
    },
  ];
  const howToUse = [
    "You can take a photo or select a photo from the gallery to classify the meat",
    "then the result will be displayed on the screen",
    "and you can retake the photo or select a photo from the gallery to classify the meat again",
  ];

  const sections = [
    {
      title: "Technologies Used",
      data: ["Tensorflow", "Expo", "FastAPI"],
    },
    {
      title: "Languages Used",
      data: ["Python", "Typescript"],
    },
  ];

  console.log({
    expectedClassNames,
    howToUse,
    sections,
  });
  return (
    <View className="absolute top-3 right-4 z-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <InfoIcon size={20} color={"#8a8e94"} />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90%] max-w-md max-h-[80%]">
          <DialogHeader className="pb-2">
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
                className={cn("text-sm native:text-base text-muted-foreground")}
              >
                What is this app? this app is a simple app that can classify
                meat
              </Text>
            </DialogDescription>
          </DialogHeader>
          <View>
            <Separator className="mb-4" />

            {/* How to use section */}
            <View className="mb-4">
              <View className="flex flex-row mb-2 gap-x-2 items-center">
                <InfoIcon size={16} color={"#8a8e94"} />
                <Text className="font-semibold">How to use?</Text>
              </View>
              {howToUse.map((item, index) => (
                <View key={index} className="flex-row items-start mb-2 px-2">
                  <Text className="text-muted-foreground mr-2 mt-0.5">•</Text>
                  <Text className="text-muted-foreground text-xs flex-1 leading-4">
                    {item}
                  </Text>
                </View>
              ))}

              {/* Expected Output */}
              <View className="mt-3">
                {expectedOutput.map((item, index) => (
                  <Collapsible
                    open={openCollapsible2 === index}
                    onOpenChange={(isOpen) =>
                      setOpenCollapsible2(isOpen ? index : null)
                    }
                    key={`collapsible-${index}`}
                    className="mb-2"
                  >
                    <CollapsibleTrigger asChild>
                      <TouchableOpacity className="flex flex-row items-center justify-between py-2 px-2 rounded-md bg-secondary/20">
                        <View className="flex flex-row items-center gap-x-2">
                          {openCollapsible2 === index ? (
                            <ChevronDown size={14} color={"#8a8e94"} />
                          ) : (
                            <ChevronRight color={"#8a8e94"} size={14} />
                          )}
                          <Text className="font-semibold text-sm text-foreground">
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="py-2 px-2 border-b border-border">
                      {item.data.map((dataItem, itemIndex) => (
                        <View
                          key={`item-${index}-${itemIndex}`}
                          className="flex-row items-start mb-1 ml-4"
                        >
                          <Text className="text-muted-foreground mr-2 mt-0.5">
                            •
                          </Text>
                          <Text className="text-muted-foreground text-xs flex-1 leading-4">
                            {dataItem}
                          </Text>
                        </View>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </View>
            </View>

            <Separator className="my-4" />

            {/* Technologies section */}
            <View className="mb-4">
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
                    <TouchableOpacity className="flex flex-row items-center justify-between py-2 px-2 rounded-md bg-secondary/20">
                      <View className="flex flex-row items-center gap-x-2">
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
                  <CollapsibleContent className="py-2 px-2 border-b border-border">
                    {section.data.map((item, itemIndex) => (
                      <View
                        key={`item-${sectionIndex}-${itemIndex}`}
                        className="flex-row items-start mb-1 ml-4"
                      >
                        <Text className="text-muted-foreground mr-2 mt-0.5">
                          •
                        </Text>
                        <Text className="text-muted-foreground text-xs flex-1 leading-4">
                          {item}
                        </Text>
                      </View>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </View>

            {/* Creator credit */}
            <View className="mt-2">
              <Text className="text-xs text-muted-foreground">
                Created By: @github.com/nbintang
              </Text>
            </View>
          </View>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button className="w-full">
                <Text>OK</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default DialogInformation;
