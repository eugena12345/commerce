import {
  ApiResponse,
  IApiStore,
  RequestParams,
} from './types';
import axios from 'axios';

const API_TOKEN = 'f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef'


export default class ApiStore implements IApiStore {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private _getRequestData<ReqT>(params: RequestParams<ReqT>): string {
    const endpoint: string = `${this.baseUrl}${params.endpoint}`;
    return endpoint;
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {

    try {
      const response = axios.get(
        this._getRequestData(params),
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        },
      )
      const data = (await response).data;
      return { success: true, data: data.data, metaInfo: data.meta }; 

    } catch (e) {
      console.log(e);
      return {
        success: false,
        data: null,
        metaInfo: null
      }
    }
  }
}