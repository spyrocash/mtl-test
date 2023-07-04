// services
import { mainService } from "@/services";

export type Vote = {
  id: number;
  vote_item_id: number;
  vote_by_user_id: number;
  created_at: string;
  updated_at: string;
};

export type VoteItemMeta = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: any;
  previous_page_url: any;
};

export type VoteItemData = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  votes: Vote[];
};

export type ApiGetListVoteItemRequestParams = {
  q?: string;
  sortBy?: string;
  page: number;
  limit: number;
};

export type ApiGetListVoteItemResponse = {
  meta: VoteItemMeta;
  data: VoteItemData[];
};

export const apiGetListVoteItem = (params: ApiGetListVoteItemRequestParams) => {
  return mainService.request({
    method: "GET",
    url: "/vote-items",
    params,
  });
};

export const apiVote = (id: number) => {
  return mainService.request({
    method: "POST",
    url: `/vote-items/${id}/vote`,
  });
};
