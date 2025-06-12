import { useQuery } from "@tanstack/react-query";
import model from "~/lib/api/model";
import { ModelInfoApiResponse } from "~/types/ModelInfoApiResponse";

const fetchModelInfo = async ({
  version,
}: {
  version?: number;
}): Promise<ModelInfoApiResponse> => {
  const res = await model.get<ModelInfoApiResponse>(`/v${version}`);
  const modelInfo = res.data;
  console.log(modelInfo.data.model_info)
  return modelInfo;
};

export default function useFetchModel({ version = 1 }: { version?: number }) {
  return useQuery({
    queryKey: ["model", version],
    queryFn: () => fetchModelInfo({ version }),
    staleTime: 5 * 60 * 1000,
    enabled: !!version,
  });
}
