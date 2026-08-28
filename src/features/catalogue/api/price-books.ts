import { apiClient } from "@/lib/api";

import type {
  AddPriceBookItemPayload,
  CreatePriceBookPayload,
  PriceBook,
  PriceBookFilters,
  PriceBookItem,
  UpdatePriceBookItemPayload,
  UpdatePriceBookPayload,
} from "@/features/catalogue/types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface PriceBooksPagination {
  type: "offset" | "cursor";
  page?: number;
  limit: number;
  totalRecords?: number;
  totalPages?: number;
  nextCursor?: number | null;
  hasMore?: boolean;
}

export interface PriceBooksListResponse {
  success: boolean;
  pagination: PriceBooksPagination;
  data: PriceBook[];
}

const PRICE_BOOKS_ENDPOINT = "/catalogue/price-books";

export async function getPriceBooks(
  filters?: PriceBookFilters,
): Promise<PriceBooksListResponse> {
  const response = await apiClient.get<PriceBooksListResponse>(
    PRICE_BOOKS_ENDPOINT,
    {
      params: filters,
    },
  );

  return response.data;
}

export async function getPriceBook(id: number): Promise<PriceBook> {
  const response = await apiClient.get<ApiResponse<PriceBook>>(
    `${PRICE_BOOKS_ENDPOINT}/${id}`,
  );

  return response.data.data;
}

export async function createPriceBook(
  payload: CreatePriceBookPayload,
): Promise<PriceBook> {
  const response = await apiClient.post<ApiResponse<PriceBook>>(
    PRICE_BOOKS_ENDPOINT,
    payload,
  );

  return response.data.data;
}

export async function updatePriceBook(
  id: number,
  payload: UpdatePriceBookPayload,
): Promise<PriceBook> {
  const response = await apiClient.patch<ApiResponse<PriceBook>>(
    `${PRICE_BOOKS_ENDPOINT}/${id}`,
    payload,
  );

  return response.data.data;
}

export async function deletePriceBook(id: number): Promise<void> {
  await apiClient.delete(`${PRICE_BOOKS_ENDPOINT}/${id}`);
}

export async function addPriceBookItem(
  priceBookId: number,
  payload: AddPriceBookItemPayload,
): Promise<PriceBookItem> {
  const response = await apiClient.post<ApiResponse<PriceBookItem>>(
    `${PRICE_BOOKS_ENDPOINT}/${priceBookId}/items`,
    {
      product_id: payload.product_id,
      selling_price: payload.selling_price,
    },
  );

  return response.data.data;
}

export async function updatePriceBookItem(
  priceBookId: number,
  itemId: number,
  payload: UpdatePriceBookItemPayload,
): Promise<PriceBookItem> {
  const response = await apiClient.patch<ApiResponse<PriceBookItem>>(
    `${PRICE_BOOKS_ENDPOINT}/${priceBookId}/items/${itemId}`,
    {
      selling_price: payload.selling_price,
    },
  );

  return response.data.data;
}

export async function deletePriceBookItem(
  priceBookId: number,
  itemId: number,
): Promise<void> {
  await apiClient.delete(
    `${PRICE_BOOKS_ENDPOINT}/${priceBookId}/items/${itemId}`,
  );
}
