import useSWR, { SWRResponse } from "swr";
import { apiFetch } from "./utils";
import { DEFAULT_LIMIT } from "./const";
import { APIResponse, FilterParams, Item } from "./types";
import { useState, useEffect } from 'react';

const apiFetcher = (args: Parameters<typeof apiFetch>) => apiFetch(...args);

export const useIds = (args: {
  offset?: number, limit?: number
}): SWRResponse<APIResponse<string[]>['result']> => useSWR(['get_ids', args], apiFetcher);

export const useItems = ({
  ids = []
}: {
  ids?: string[]
}): SWRResponse<APIResponse<Item[]>['result']> => useSWR(['get_items', { ids }], apiFetcher);

export const useFields = ({
  offset = 0, limit = DEFAULT_LIMIT, field
}: {
  offset?: number, limit?: number, field: string
}): SWRResponse<APIResponse<(string | null)[]>['result']> => useSWR(
  ['get_fields', { offset, limit, field }], apiFetcher);

export const useFilter = (
  fields: FilterParams
): SWRResponse<APIResponse<string[]>['result']> => useSWR(['filter', fields], apiFetcher);

// https://github.com/vercel/swr/issues/110#issuecomment-552637429
export default function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}