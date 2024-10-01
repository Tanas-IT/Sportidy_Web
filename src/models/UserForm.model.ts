export interface UserForm {
  userId: {
    value: number;
    errorMessage: string;
  };
  fullName: {
    value: string;
    errorMessage: string;
  };
  userName: {
    value: string;
    errorMessage: string;
  };
  phoneNumber: {
    value: string;
    errorMessage: string;
  };
  DOB: {
    value: Date | null;
    errorMessage: string;
  };
  gender: {
    value: number | null;
    errorMessage: string;
  };
  description: {
    value: string;
    errorMessage: string;
  };
  isDeleted: {
    value: number;
    errorMessage: string;
  };
}
