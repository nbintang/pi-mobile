import { useQuery } from "@tanstack/react-query";
import model from "~/lib/api/model";
import { ApiResponse } from "~/types/ApiResponse";
import { Predictions } from "~/types/PredictionsApiResponse";

const fetchHistories = async ({
  limit,
  offset,
}: {
  limit?: number;
  offset?: number;
}): Promise<ApiResponse<Predictions[]>> => {
  const res = await model.get<ApiResponse<Predictions[]>>(`/histories`, {
    params: {
      limit,
      offset,
    },
  });
  const modelInfo = res.data
  return modelInfo;
};

export default function useFetchModel({
  limit,
  offset,
}: {
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: ["model"],
    queryFn:async () => await fetchHistories({ limit, offset }),
    staleTime: 5 * 60 * 1000,
  });
}
