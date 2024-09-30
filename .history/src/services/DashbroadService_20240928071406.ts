import axios from "axios";
import axiosAuth from "../api/axiosAuth";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { AdminDashboardData, BrandDashboardData } from "../payloads/responses/DashboarData.model";

export const getDashboardAdmin = async (year: number): Promise<ApiResponse<AdminDashboardData>> => {
  const res = await axiosAuth.get(`statistic/${year}`);
  const apiResponse = res.data as ApiResponse<AdminDashboardData>;
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
