import { MetaInfo } from "./../CatalogStore/types";
  
  export type RequestParams = {
    endpoint: string; 
  };
  
  export enum StatusHTTP {
    status200 = 200,
    status201 = 201,
    status300 = 300,
    status304 = 304,
    status400 = 400,
    status401 = 401,
    status403 = 403,
    status404 = 404,
    status422 = 422,
    UNEXPECTED_ERROR = 'UNEXPECTED ERROR',
  }
  
  export type ApiResponse<SuccessT, ErrorT> =
    | {
        success: true;
        data: SuccessT;
        metaInfo: MetaInfo;
      }
    | {
        success: false;
        data: ErrorT;
        metaInfo: MetaInfo;
      }
    | {
        success: false;
        data: null;
        metaInfo: null;
      };
  
  export interface IApiStore {
    readonly baseUrl: string;
  
    request<SuccessT, ErrorT = any>( 
      params: RequestParams //<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>>;
  }