import { isDate } from "util/types";
import { BranchForm } from "../models/BranchForm.model";
import { BrandForm } from "../models/BrandForm.model";
import { PasswordForm } from "../models/Password.model";
import { ProductForm } from "../models/ProductForm.model";
import { UserForm } from "../models/UserForm.model";
import { LimitBrandData } from "../payloads/responses/BrandData.model";
import {
  AdminDashboardData,
  AdminFeedbackDashboardData,
  AdminPaymentDasboardData,
  AdminPlayFieldDashboardData,
  AdminRevenueDashboardData,
  AdminUserDashboardData,
  BrandDashboardData,
  FeedbackDashBoard,
} from "../payloads/responses/DashboarData.model";
import { PlanData } from "../payloads/responses/PlanResponse.model";
import { SubscriptionData } from "../payloads/responses/SubscriptionData.model";
import { PlayFieldForm } from "../models/PlayFieldForm.model";

export const getInitialUserForm = (): UserForm => ({
  fullName: {
    value: "",
    errorMessage: "",
  },
  userName: {
    value: "",
    errorMessage: "",
  },
  phoneNumber: {
    value: "",
    errorMessage: "",
  },
  DOB: {
    value: null,
    errorMessage: "",
  },
  gender: {
    value: 0,
    errorMessage: "",
  },
  isDeleted: {
    value: 0,
    errorMessage: "",
  },
  userId: {
    value: 0,
    errorMessage: "",
  },
  description: {
    value: "",
    errorMessage: "",
  },
});

export const getInitialBrandForm = (): BrandForm => ({
  brandName: { value: "", errorMessage: "" },
  image: { value: null, errorMessage: "" },
  imageUrl: {
    value: "",
    errorMessage: "",
  },
});

export const getInitialBranchForm = (): BranchForm => ({
  brandName: { id: "", value: "", errorMessage: "" },
  city: { id: "", name: "", errorMessage: "" },
  district: { id: "", name: "", errorMessage: "" },
  ward: { id: "", name: "", errorMessage: "" },
  address: { value: "", errorMessage: "" },
});

export const getInitialProductForm = (): ProductForm => ({
  category: { value: null, errorMessage: "" },
  productName: { value: "", errorMessage: "" },
  image: { value: null, errorMessage: "" },
  imageUrl: { value: "", errorMessage: "" },
  description: { value: "", errorMessage: "" },
  price: { value: null, errorMessage: "" },
});

export const getInitialPasswordForm = (): PasswordForm => ({
  oldPassword: { value: "", errorMessage: "" },
  newPassword: { value: "", errorMessage: "" },
  confirm: { value: "", errorMessage: "" },
});

export const getInitialAdminDashboardData = (): AdminDashboardData => ({
  numberOfUsers: 0,
  totalRevenue: "0",
  listRevenue: [],
  monthlyRevenue: 1,
  year: 0,
});

export const getInitialAdminRevenueDashboardData = (): AdminRevenueDashboardData => ({
  year: 0,
  monthlyRevenues: [{ month: 0, revenue: 0 }],
  totalRevenue: 0,
});

export const getInitialAdminUserDashboardData = (): AdminUserDashboardData => ({
  totalUsers: 0,
  monthlyStatistics: [{ month: 0, userCount: 0 }],
});

export const getInitialAdminPlayFieldDashboardData = (): AdminPlayFieldDashboardData => ({
  totalPlayField: 0,
  totalBooking: 0,
  fieldPercentages: [{ fieldTypeName: "", percentage: 0 }],
});

export const getInitialAdminPaymentDashboardData = (): AdminPaymentDasboardData => [
  {
    email: "",
    dateOfTransaction: new Date("2024-10-02"),
    status: 0,
    totalAmount: 0,
  },
];

export const getInitialBrandDashboardData = (): BrandDashboardData => ({
  store: 0,
  product: 0,
  menus: 0,
  timesRecomments: [],
  productsByCate: [],
});

export const getInitialFeedbackDashboardData = (): FeedbackDashBoard => ({
  totalFeedback: 0,
  totalImage: 0,
  totalRating: 0,
  totalVideo: 0,
});

export const getInitialFeedbackData = (): AdminFeedbackDashboardData => [
  {
    avatar: "",
    content: "",
    feedbackCode: "",
    feedbackDate: "",
    feedbackId: 0,
    imageUrl: "",
    isAnonymous: false,
    rating: 0,
    userFullName: "",
    videoUrl: "",
  },
];

export const getInitialPlanData = (): PlanData => ({
  planId: 0,
  planName: "",
  maxMenu: 0,
  maxAccount: 0,
  price: "",
});

export const getInitialSubscriptionData = (): SubscriptionData => ({
  userId: 0,
  subscriptionId: 0,
  startDate: null,
  endDate: null,
  planId: "",
  planName: "",
  price: "",
  maxMenu: 0,
  maxAccount: 0,
  menuCount: 0,
  storeCount: 0,
  payments: [],
});

export const getInitialLimitBrandData = (): LimitBrandData => ({
  maxMenu: 0,
  maxAccount: 0,
  numberMenu: 0,
  numberAccount: 0,
});

export const getInitialPlayFieldForm = (): PlayFieldForm => ({
  playFieldName: { value: "", errorMessage: "" },
  address: { value: "", errorMessage: "" },
  price: { value: 0, errorMessage: "" },
  status: { value: 0, errorMessage: "" },
});
