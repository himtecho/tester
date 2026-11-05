export interface Response<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}
