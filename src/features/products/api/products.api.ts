import { apiClient } from "@/lib/api";

import type {
  CreateProductInput,
  ProductCategorySummaryResponse,
  ProductHistoryResponse,
  ProductImportResponse,
  ProductListResponse,
  ProductQuery,
  ProductResponse,
  ProductStatsResponse,
  UpdateProductInput,
} from "@/features/products/types";

const PRODUCTS_URL = "/catalogue/products";

export async function getProducts(
  query: ProductQuery = {},
) {
  const response =
    await apiClient.get<ProductListResponse>(
      PRODUCTS_URL,
      {
        params: query,
      },
    );

  return response.data;
}

export async function getProductStats() {
  const response =
    await apiClient.get<ProductStatsResponse>(
      `${PRODUCTS_URL}/stats`,
    );

  return response.data;
}

export async function getProductCategorySummary() {
  const response =
    await apiClient.get<ProductCategorySummaryResponse>(
      `${PRODUCTS_URL}/category-summary`,
    );

  return response.data;
}

export async function getProductByBarcode(
  barcode: string,
) {
  const encodedBarcode =
    encodeURIComponent(barcode);

  const response =
    await apiClient.get<ProductResponse>(
      `${PRODUCTS_URL}/barcode/${encodedBarcode}`,
    );

  return response.data;
}

export async function getProductById(
  productId: number,
) {
  const response =
    await apiClient.get<ProductResponse>(
      `${PRODUCTS_URL}/${productId}`,
    );

  return response.data;
}

export async function getProductHistory(
  productId: number,
) {
  const response =
    await apiClient.get<ProductHistoryResponse>(
      `${PRODUCTS_URL}/${productId}/history`,
    );

  return response.data;
}

export async function createProduct(
  values: CreateProductInput,
) {
  const response =
    await apiClient.post<ProductResponse>(
      PRODUCTS_URL,
      values,
    );

  return response.data;
}

export async function updateProduct(
  productId: number,
  values: UpdateProductInput,
) {
  const response =
    await apiClient.patch<ProductResponse>(
      `${PRODUCTS_URL}/${productId}`,
      values,
    );

  return response.data;
}

export async function deleteProduct(
  productId: number,
) {
  const response =
    await apiClient.delete<ProductResponse>(
      `${PRODUCTS_URL}/${productId}`,
    );

  return response.data;
}

export async function restoreProduct(
  productId: number,
) {
  const response =
    await apiClient.patch<ProductResponse>(
      `${PRODUCTS_URL}/${productId}/restore`,
    );

  return response.data;
}

export async function importProducts(
  file: File,
) {
  const formData = new FormData();

  formData.append("file", file);

  const response =
    await apiClient.post<ProductImportResponse>(
      `${PRODUCTS_URL}/import`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

  return response.data;
}