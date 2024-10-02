import { FeedbackData } from "./FeedbackData.model";
import { UserData } from "./UserData.model";

interface listRevenue {
  year: number;
  month: number;
  totalRevenue: string;
}

interface recentTransactions {
  paymentId: number;
  email: string;
  amount: string;
  paymentDate: Date;
  transactionId: string;
  status: number;
}
export interface AdminDashboardData {
  numberOfUsers: number;
  totalRevenue: string;
  monthlyRevenue: number;
  listRevenue: listRevenue[];
  year: number;
}
interface monthlyRevenue {
  month: number;
  revenue: number;
}

interface monthlyUser {
  month: number;
  userCount: number;
}

interface fieldPercentages {
  fieldTypeName: string;
  percentage: number;
}

interface paymentData {
  email: string;
  dateOfTransaction: Date;
  totalAmount: number;
  status: number;
}

export interface AdminRevenueDashboardData {
  year: number;
  monthlyRevenues: [monthlyRevenue];
  totalRevenue: number;
}

export interface AdminUserDashboardData {
  totalUsers: number;
  monthlyStatistics: [monthlyUser];
}

export interface AdminPlayFieldDashboardData {
  totalPlayField: number;
  totalBooking: number;
  fieldPercentages: [fieldPercentages];
}

export interface AdminPaymentDasboardData extends Array<paymentData> {}
export interface AdminFeedbackDashboardData extends Array<FeedbackData> {}
// ----------------------------------------------------------------

interface timesRecomments {
  menuId: number;
  times: number;
  description: string;
}

interface productsByCate {
  numberOfProduct: number;
  cateName: string;
}

export interface BrandDashboardData {
  store: number;
  product: number;
  menus: number;
  timesRecomments: timesRecomments[];
  productsByCate: productsByCate[];
}

export interface FeedbackDashBoard {
  totalFeedback: number;
  totalImage: number;
  totalVideo: number;
  totalRating: number;
}
