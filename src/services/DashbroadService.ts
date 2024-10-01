import axios from "axios";
import axiosAuth from "../api/axiosAuth";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import {
  AdminPaymentDasboardData,
  AdminPlayFieldDashboardData,
  AdminRevenueDashboardData,
  AdminUserDashboardData,
  BrandDashboardData,
} from "../payloads/responses/DashboarData.model";

export const getDashboardAdmin = async (year: number): Promise<AdminRevenueDashboardData> => {
  const res = await axiosAuth.get(`bookings/statistic/${year}`);
  const apiResponse = res.data as AdminRevenueDashboardData;
  return apiResponse;
};

export const getUserInDashboardAdmin = async (
  year: number,
): Promise<ApiResponse<AdminUserDashboardData>> => {
  const res = await axiosAuth.get(`users/statistic/${year}`);
  const apiResponse = res.data as ApiResponse<AdminUserDashboardData>;
  return apiResponse;
};

export const getPlayFieldInDashboardAdmin = async (
  year: number,
): Promise<AdminPlayFieldDashboardData> => {
  const res = await axiosAuth.get(`bookings/statistic/play-field-rate/${year}`);
  const apiResponse = res.data as AdminPlayFieldDashboardData;
  return apiResponse;
};

export const getPaymentInDashboardAdmin = async (): Promise<
  ApiResponse<AdminPaymentDasboardData>
> => {
  const res = await axiosAuth.get(`payment/payment-statistic`);
  const apiResponse = res.data as ApiResponse<AdminPaymentDasboardData>;
  return apiResponse;
};

export const getDashboardBrand = async (
  brandId: number,
): Promise<ApiResponse<BrandDashboardData>> => {
  try {
    const res = await axiosAuth.get(`brands/dashboard/${brandId}`);
    const apiResponse = res.data as ApiResponse<BrandDashboardData>;
    return apiResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as ApiResponse<BrandDashboardData>;
    }
    throw new Error("Unexpected error");
  }
};
