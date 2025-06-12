import { useState } from "react";
import { useCamera } from "./useCamera";
import usePostModel from "./usePostModel";
import { PostModelApiResponse } from "~/types/PostModelApiResponse"; // Import the type
import * as FileSystem from "expo-file-system";

export const useCameraWithProcessor = (modelVersion: number = 1) => {
  const [result, setResult] = useState<PostModelApiResponse["data"] | null>(
    null
  );
  const {
    mutateAsync,
    isPending: isProcessing, // Rename isPending to isProcessing for clarity
  } = usePostModel({ version: modelVersion });
  const camera = useCamera();

  const captureAndProcess = async () => {
    setResult(null); // Clear previous results
    const photo = await camera.takePicture();
    if (photo) {
      console.log(photo);
      try {
        const fileUri = photo.uri;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        if (!fileInfo.exists) {
          throw new Error("File does not exist");
        }
        const file = {
          uri: fileInfo.uri,
          name: "photo.jpg",
          type: "image/jpeg",
        } as any; // Cast to `any` because React Native doesn't have native `File` support
        const modelResponse = await mutateAsync(file);
        setResult(modelResponse); // Set the result
      } catch (error) {
        console.error("Error processing image:", error);
        setResult(null); // Clear result on error
      }
    }
    return photo;
  };

  const retakeAndClear = () => {
    camera.retakePicture();
    setResult(null); // Clear result on retake
  };

  return {
    ...camera,
    captureAndProcess,
    retakeAndClear,
    isProcessing,
    result,
  };
};
