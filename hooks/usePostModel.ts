import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";
import model from "~/lib/api/model";
import { PostModelApiResponse } from "~/types/PostModelApiResponse";

const classifiedModel = async ({
  version,
  file,
}: {
  version: number;
  file: File;
}): Promise<PostModelApiResponse["data"]> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await model.post(`/v${version}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data as PostModelApiResponse["data"];
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
    throw error;
  }
};

export default function usePostModel({ version = 1 }: { version?: number }) {
  return useMutation({
    mutationKey: ["model", version],
    mutationFn: (file: File) => classifiedModel({ version, file }),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });
}
