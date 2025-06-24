export interface ApiResponse<T> {
  success: boolean;
  status: string;
  message: string;
  data: T;
  meta:{
    timestamp: string;
  }
}