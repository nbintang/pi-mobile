import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  BeefIcon,
  ChevronDown,
  ChevronRight,
  InfoIcon,
  SquareCodeIcon,
  BookOpenIcon,
  UserIcon,
} from "lucide-react-native";
import { Button } from "./ui/button";
import { Text } from "~/components/ui/text";
import { Linking, ScrollView, TouchableOpacity, View } from "react-native";
import { cn, formatLabels } from "../lib/utils";
import { sectionDevelopers, sectionhowToUse, sectionTechs } from "~/lib/dummy";

const DialogInformation = ({
  isSuccess,
  data,
}: {
  isSuccess: boolean;
  data: any;
}) => {
  const [activeTab, setActiveTab] = React.useState<string>("info");
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

  return (
    <View className="absolute top-3 right-4 z-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <InfoIcon size={20} color={"#8a8e94"} />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90%] max-w-md h-[80vh]">
          <DialogHeader className="pb-2">
            <View className="flex flex-row items-center gap-x-2">
              <BeefIcon color={"#8a8e94"} size={19} />
              <Text
                className={cn(
                  "text-lg native:text-xl text-foreground font-semibold leading-none tracking-tight"
                )}
              >
                Meat Classifier
              </Text>
            </View>
            <DialogDescription>
              <Text
                className={cn("text-sm native:text-sm text-muted-foreground")}
              >
                AI-powered tool for identifying meat types from images
              </Text>
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex-row w-full">
              <TabsTrigger
                value="info"
                className="flex-row gap-x-1 w-1/2 rounded-md"
              >
                <InfoIcon size={14} color={"#8a8e94"} />
                <Text className="text-xs">Info</Text>
              </TabsTrigger>
              <TabsTrigger
                value="usage"
                className="flex-row gap-x-1 w-1/2 rounded-md"
              >
                <BookOpenIcon size={14} color={"#8a8e94"} />
                <Text className="text-xs">Usage</Text>
              </TabsTrigger>
            </TabsList>

            {/* App Information Tab */}
            <TabsContent value="info" className="flex-1 mt-3">
              <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 16 }}
              >
                <View className="space-y-4">
                  {/* Technologies section */}
                  <View>
                    <View className="flex flex-row mb-3 items-center gap-x-2">
                      <SquareCodeIcon size={16} color={"#8a8e94"} />
                      <Text className="text-base font-bold">Powered by</Text>
                    </View>
                    {sectionTechs.map(({ data, ...section }, sectionIndex) => (
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
                        <CollapsibleContent className="py-2 px-2">
                          {data.map(({ name, url }, itemIndex) => (
                            <View
                              key={`item-${sectionIndex}-${itemIndex}`}
                              className="flex-row items-center ml-4"
                            >
                              <Text className="text-muted-foreground">•</Text>
                              <Text
                                onPress={() => Linking.openURL(url)}
                                className="text-muted-foreground hover:underline text-base flex-1 ml-3 my-1"
                              >
                                {name}
                              </Text>
                            </View>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </View>
                  <Separator />
                  <View className=" mt-3">
                    <View className="flex flex-row mb-2 items-center gap-x-2 ">
                      <InfoIcon size={16} color={"#8a8e94"} />
                      <Text className="font-semibold">Disclaimer</Text>
                    </View>
                    <Text className="text-xs text-muted-foreground leading-4 px-2">
                      The prediction results from this app are only estimations
                      based on image classification. They cannot fully guarantee
                      the freshness or quality of the meat. For accurate
                      results, please verify manually or consult with an expert.
                    </Text>
                  </View>
                  <View className="mt-3 space-y-1">
                    <Text className="text-xs text-muted-foreground">
                      Created By: @github.com/nbintang
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      Feel free to use this app!
                    </Text>
                  </View>
                </View>

                <Separator className="my-3" />
                <View className="space-y-3">
                  <View className="flex flex-row mb-2 items-center gap-x-2">
                    <UserIcon size={16} color={"#8a8e94"} />
                    <Text className="font-semibold text-base">
                      About Developer
                    </Text>
                  </View>
                  {sectionDevelopers.map((dev, index) => (
                    <View key={index} className="px-2 space-y-1 mb-3">
                      <Text className="text-xs text-muted-foreground">
                        Name: {dev.name}
                      </Text>
                      <Text className="text-xs text-muted-foreground">
                        Program: {dev.program}
                      </Text>
                      <Text className="text-xs text-muted-foreground">
                        Year: {dev.year}
                      </Text>
                      <Collapsible >
                        <CollapsibleTrigger asChild>
                          <TouchableOpacity className="flex flex-row items-center justify-between py-1 px-2 rounded-md bg-secondary/20 mt-1">
                            <View className="flex flex-row items-center gap-x-2">
                              <ChevronRight size={12} color={"#8a8e94"} />
                              <Text className="text-xs font-semibold text-foreground">
                                Contacts
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-1 px-2">
                          {dev.contacts.map((contact, cIndex) => (
                            <TouchableOpacity
                              key={cIndex}
                              onPress={() => Linking.openURL(contact.url)}
                              className="ml-3 flex flex-row items-center"
                            >
                              <Text className="text-muted-foreground mr-2">
                                •
                              </Text>
                              <Text className="text-xs text-blue-500 underline">
                                {contact.name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </TabsContent>
            <TabsContent value="usage" className="space-y-4  mt-3">
              <View className="space-y-4">
                <View>
                  <View className="flex flex-row mb-3 gap-x-2 items-center">
                    <BookOpenIcon size={16} color={"#8a8e94"} />
                    <Text className="font-semibold text-base">How to use?</Text>
                  </View>
                  {sectionhowToUse.map((item, index) => (
                    <View
                      key={index}
                      className="flex-row items-start mb-2 px-2"
                    >
                      <Text className="text-muted-foreground mr-3 mt-1 text-sm">
                        {index + 1}.
                      </Text>
                      <Text className="text-muted-foreground text-sm flex-1 leading-5">
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
                <Separator />
                <View className="mt-3">
                  {expectedOutput.map((item, index) => (
                    <Collapsible
                      open={openCollapsible2 === index}
                      onOpenChange={(isOpen) =>
                        setOpenCollapsible2(isOpen ? index : null)
                      }
                      key={`collapsible-${index}`}
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
                      <CollapsibleContent className="py-2 px-2">
                        {item.data.map((dataItem, itemIndex) => (
                          <View
                            key={`item-${index}-${itemIndex}`}
                            className="flex-row items-center ml-4 mb-1"
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
            </TabsContent>
            {/* Developer Tab */}
          </Tabs>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default DialogInformation;
