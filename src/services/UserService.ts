import axiosAuth from "../api/axiosAuth";
import { UserForm } from "../models/UserForm.model";
import { userUpdate } from "../payloads/requests/updateRequests.model";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { GetData } from "../payloads/responses/GetData.model";
import { UserData } from "../payloads/responses/UserData.model";

export const getUsers = async (
  currentPage: number,
  rowsPerPage: number,
  searchValue: string,
  sortby: string | null,
  direction: string | null,
): Promise<GetData<UserData>> => {
  const res = await axiosAuth.get("users", {
    params: {
      sortby: sortby || null,
      direction: direction || null,
      pageNumber: currentPage,
      pageSize: rowsPerPage,
      searchKey: searchValue,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse.data as GetData<UserData>;
};

export const createUser = async (user: UserForm, roleId: number): Promise<ApiResponse<Number>> => {
  const res = await axiosAuth.post("app-users", {
    userName: user.userName.value,
    fullname: user.fullName.value,
    phone: user.phoneNumber.value,
    dob: user.DOB.value ? user.DOB.value.toISOString().split("T")[0] : "",
    gender: user.gender.value,
    roleId: roleId,
    isActive: user.isDeleted.value === 1 ? true : false,
  });
  const apiResponse = res.data as ApiResponse<Number>;
  return apiResponse;
};

export const getUser = async (id: number): Promise<ApiResponse<UserData>> => {
  const res = await axiosAuth.get(`users/${id}`);
  const apiResponse = res.data as ApiResponse<UserData>;
  return apiResponse;
};

export const updateUser = async (id: number, user: userUpdate): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.put(`users/update-user`, user);
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};

export const deleteUser = async (id: number): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.delete(`users/delete-user/${id}`);
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};
