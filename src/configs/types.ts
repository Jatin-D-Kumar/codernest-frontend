export type ApiResponse = {
  statusCode: number;
  data: any;
  success: boolean;
  message: string;
};

export type ApiErrorResponse = {
  data: {
    data: any;
    success: boolean;
    message: string;
    errors: any[];
    statusCode: number;
    stack?: string;
  };
  status: number;
};

export type Tag = {
  id: string;
  name: string;
};

export type Language = {
  id: string;
  title: string;
  value: string;
};
