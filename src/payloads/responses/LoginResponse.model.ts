export interface UserLoginData {
  UserId: number;
  role: string;
  email: string;
  Status: string;
  DeviceCode: string;
  FullName: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
  httpCode: number;
}
