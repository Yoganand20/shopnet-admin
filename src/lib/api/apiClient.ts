import type { Attribute, AttributeValue, CreateAttributeRequest, UpdateAttributeRequest, UpdateAttributeValueRequest } from "@/types/attributeTypes";
import { axiosInstance } from "./axiosInstance";
import type { LoginRequest, AuthResponse, SignupRequest, ForgotPasswordRequest, EmailVerificationRequest, ResetPasswordRequest } from "@/types/authTypes"
import type { Category, CategoryRequest } from "@/types/categoryTypes";

//auth
export const loginApi = (data: LoginRequest) =>
  axiosInstance.post<AuthResponse>("auth/login", data);

export const signupApi = (data: SignupRequest) => axiosInstance.post<void>("auth/signup", data);

export const fetchCurrentUser = () => axiosInstance.get<AuthResponse>("auth/me");

export const forgotPasswordApi = (data: ForgotPasswordRequest) => {
  axiosInstance.post<AuthResponse>("auth/forgot-password", data);
}

export const resetPasswordApi = (data: ResetPasswordRequest, userId: string) => {
  const path = "auth/reset-password/" + userId;
  axiosInstance.patch<AuthResponse>(path, data);
}

export const emailVerificationApi = (data: EmailVerificationRequest, userId: string) => {
  const path = "auth/verify-email/" + userId;
  console.log(path, data);
  axiosInstance.patch<AuthResponse>(path, data);
}

//attribute
export const getAttributesApi = (page: number = 0, rows: number = 10) =>
  axiosInstance.get<PageResponse<Attribute>>("/attribute", {
    params: { page, rows }
  });

export const getAttributeByIdApi = (id: number) =>
  axiosInstance.get<Attribute>(`/attribute/${id}`);

export const createAttributeApi = (data: CreateAttributeRequest) =>
  axiosInstance.post<Attribute>("/attribute", data);

export const updateAttributeApi = (id: number, data: UpdateAttributeRequest) =>
  axiosInstance.put<Attribute>(`/attribute/${id}`, data);

export const deleteAttributeApi = (id: number) =>
  axiosInstance.delete<void>(`/attribute/${id}`);

export const addValuesToAttributeApi = (id: number, data: UpdateAttributeValueRequest) =>
  axiosInstance.post<Attribute>(`/attribute/${id}/values`, data);

export const removeValuesFromAttributeApi = (id: number, data: UpdateAttributeValueRequest) =>
  axiosInstance.delete<Attribute>(`/attribute/${id}/values`, { data });

export const getAttributeValuesByIdApi = (id: number, page: number = 0, rows: number = 10) =>
  axiosInstance.get<PageResponse<AttributeValue>>(`/attribute/${id}/values`, {
    params: { page, rows }
  });

export const getAllAttributeValuesApi = (page: number = 0, rows: number = 10) =>
  axiosInstance.get<PageResponse<AttributeValue>>("/attribute/values", {
    params: { page, rows }
  });

// Category API
export const getCategoriesApi = (page: number = 0, rows: number = 10) =>
  axiosInstance.get<PageResponse<Category>>("/category", {
    params: { page, rows }
  });

export const getCategoryByIdApi = (id: number) =>
  axiosInstance.get<Category>(`/category/${id}`);

export const createCategoryApi = (data: CategoryRequest) =>
  axiosInstance.post<Category>("/category", data);

export const updateCategoryApi = (id: number, data: CategoryRequest) =>
  axiosInstance.put<Category>(`/category/${id}`, data);

export const deleteCategoryApi = (id: number) =>
  axiosInstance.delete<void>(`/category/${id}`);


// Supporting types
export interface PageResponse<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
