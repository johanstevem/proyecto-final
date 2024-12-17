

export interface ApiResponse<T> {
  statusCode: number;
  status: string;
  message: ApiMessage;
  data: T;
}

export interface ApiData<T> {
  result: T;
  totalCount: number;
}

export interface ApiMessage {
  es: string;
  en: string;
}