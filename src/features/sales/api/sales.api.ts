import { apiClient } from "@/lib/api";

import type {
  CreateSaleRequest,
  RefundSaleRequest,
  SaleActionResponse,
  SaleReceiptResponse,
  SaleResponse,
  SalesListResponse,
  SalesQuery,
  SaleStatsResponse,
  UpdateSaleRequest,
} from "../types";

const SALES_ENDPOINT = "/sales";

export async function getSales(
  query: SalesQuery = {},
): Promise<SalesListResponse> {
  const response =
    await apiClient.get<SalesListResponse>(
      SALES_ENDPOINT,
      {
        params: query,
      },
    );

  return response.data;
}

export async function getSaleById(
  saleId: string,
): Promise<SaleResponse> {
  const response =
    await apiClient.get<SaleResponse>(
      `${SALES_ENDPOINT}/${saleId}`,
    );

  return response.data;
}

export async function getSalesStats(): Promise<SaleStatsResponse> {
  const response =
    await apiClient.get<SaleStatsResponse>(
      `${SALES_ENDPOINT}/stats`,
    );

  return response.data;
}

export async function createSale(
  data: CreateSaleRequest,
): Promise<SaleResponse> {
  const response =
    await apiClient.post<SaleResponse>(
      SALES_ENDPOINT,
      data,
    );

  return response.data;
}

export async function updateSale(
  saleId: string,
  data: UpdateSaleRequest,
): Promise<SaleResponse> {
  const response =
    await apiClient.patch<SaleResponse>(
      `${SALES_ENDPOINT}/${saleId}`,
      data,
    );

  return response.data;
}

export async function cancelSale(
  saleId: string,
): Promise<SaleActionResponse> {
  const response =
    await apiClient.delete<SaleActionResponse>(
      `${SALES_ENDPOINT}/${saleId}`,
    );

  return response.data;
}

export async function restoreSale(
  saleId: string,
): Promise<SaleResponse> {
  const response =
    await apiClient.patch<SaleResponse>(
      `${SALES_ENDPOINT}/${saleId}/restore`,
    );

  return response.data;
}

export async function refundSale(
  saleId: string,
  data: RefundSaleRequest,
): Promise<SaleResponse> {
  const response =
    await apiClient.post<SaleResponse>(
      `${SALES_ENDPOINT}/${saleId}/refund`,
      data,
    );

  return response.data;
}

export async function getSaleReceipt(
  saleId: string,
): Promise<SaleReceiptResponse> {
  const response =
    await apiClient.get<SaleReceiptResponse>(
      `${SALES_ENDPOINT}/${saleId}/receipt`,
    );

  return response.data;
}