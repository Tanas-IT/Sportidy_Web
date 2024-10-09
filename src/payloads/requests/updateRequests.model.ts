export interface userUpdate {
  userId: number;
  description: string;
  fullName: string;
  birthday: string;
  gender: number | null;
  phoneNumber: string;
  isDeleted: number | null;
}

export interface brandUpdate {
  id: number;
  brandName: string;
  image: File | null;
}

export interface branchUpdate {
  id: number;
  city: string;
  district: string;
  ward: string;
  address: string;
  isActive: boolean;
}

export interface categoryUpdate {
  categoryName: string;
}

export interface productUpdate {
  id: number;
  productName: string;
  image: File | null;
  description: string;
  price: number;
}

export interface customerSegmentUpdate {
  segmentName: string;
  age: string;
  gender: string;
  session: string;
}
