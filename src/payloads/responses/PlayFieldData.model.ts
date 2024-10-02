export interface PlayFieldData {
  playFieldId: number;
  playFieldCode: string;
  playFieldName: string;
  price: number;
  address: string;
  openTime: string;
  userId: number;
  fullName: string;
  sportName: string;
  closeTime: string;
  avatarImage: string;
  status: number;
  isDependency: any | null;
  sportId: number;
  bookings: any[];
  imageFields: string;
  user: any | null;
  playFieldContainer: any | null;
  listSubPlayFields: any[];
  sport: any | null;
}
