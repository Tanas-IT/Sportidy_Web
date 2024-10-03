export interface PlayFieldForm {
  playFieldName: { value: string; errorMessage: string };
  address: { value: string; errorMessage: string };
  price: { value: number; errorMessage: string };
  status: { value: number; errorMessage: string };
}
