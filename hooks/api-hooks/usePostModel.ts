import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";
import model from "~/lib/api/model";
import { ApiResponse } from "~/types/ApiResponse";
import { PostPredictions } from "~/types/PostModelApiResponse";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";

const classifiedModel = async ({
  file,
}: {
  file: ImagePickerAsset;
}): Promise<ApiResponse<PostPredictions>> => {
  const formData = new FormData();
  const filename = file.uri.split("/").pop();
  if (!filename) throw new Error("Error uploading image.");
  formData.append("file", {
    uri: file.uri,
    type: "image/jpeg",
    name: filename,
  } as any);
  const response = await model.post<ApiResponse<PostPredictions>>(
    `/predict-freshness`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const data = response.data;
  return data as ApiResponse<PostPredictions>;
};

export default function usePostModel() {
  return useMutation({
    mutationKey: ["model"],
    mutationFn: async (file: ImagePickerAsset) =>
      await classifiedModel({ file }),
    onMutate: () => {
      Toast.show({
        type: "info",
        text1: "predicting...",
      });
    },
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: data.message,
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        Toast.show({
          type: "error",
          text1: error.response?.data?.message || "Terjadi kesalahan",
        });
      }
    },
  });
}
