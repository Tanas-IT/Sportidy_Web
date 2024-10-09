interface playField {
  playFieldId: number;
  playFieldCode: string;
  playFieldName: string;
  price: number;
  address: string;
  openTime: string;
  userId: number;
  fullName: string;
  closeTime: string;
  avatarImage: string;
  status: number;
  isDependency: number;
  sportId: number;
  sportName: string;
  bookings: [];
  imageFields: [];
}
export interface PaymentData {
  bookingId: number;
  price: string;
  status: number;
  bookingDate: Date;
  dateStart: Date;
  dateEnd: Date;
  paymentMethod: string;
  bankName: string;
  bankCode: string;
  playFieldOwnerName: string;
  description: string;
  playField: playField;
  playFieldName: string;
  playFieldFeedbacks: [];
  payments: [];
  customerId: number;
  playFieldId: number;
}
