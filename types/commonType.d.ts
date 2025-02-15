export interface IRequest {
      url: string;
      method: string;
      body?: { [key: string]: any };
      queryParams?: any;
      useCredentials?: boolean;
      headers?: any;
      nextOption?: any;
    }
  
export interface IBackendRes<T> {
      error?: string | string[];
      message: string;
      statusCode: number | string;
      data?: T;
    }