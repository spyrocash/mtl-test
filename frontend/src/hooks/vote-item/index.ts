import useSWR, { Fetcher } from "swr";

// services
import {
  apiGetListVoteItem,
  ApiGetListVoteItemRequestParams,
  ApiGetListVoteItemResponse,
} from "@/services/vote-item";

type UseVoteItemsProps = ApiGetListVoteItemRequestParams & {};

export const useVoteItems = (props: UseVoteItemsProps) => {
  const fetcher: Fetcher<any, ApiGetListVoteItemRequestParams> = (params) => {
    return apiGetListVoteItem(params).then((res) => res.data);
  };

  // vars
  const params = {
    ...props,
  };

  // hooks
  const { data, isLoading } = useSWR<ApiGetListVoteItemResponse>(
    params,
    fetcher
  );

  return {
    data,
    isLoading,
  };
};
