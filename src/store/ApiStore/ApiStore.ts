//import { stringify } from 'qs';

import {
  ApiResponse,
  IApiStore,
  RequestParams,
  //HTTPMethod,
  //StatusHTTP,
} from './types';
import axios from 'axios';

const API_TOKEN = 'f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef'


export default class ApiStore implements IApiStore {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private _getRequestData<ReqT>(params: RequestParams<ReqT>): string { //[RequestInfo, RequestInit]
    const endpoint: string = `${this.baseUrl}${params.endpoint}`; //RequestInfo
    // const options: RequestInit = {
    //   //method: params.method,
    //   headers: { ...params.headers },
    // };

    // if (params.method === HTTPMethod.GET) {
    //   endpoint = `${endpoint}?${stringify(params.data)}`;
    // }

    // if (params.method === HTTPMethod.POST) {
    //   options.headers = {
    //     ...options.headers,
    //     "Content-Type": "application/json;charset=utf-8",
    //   };
    //   options.body = JSON.stringify(params.data);
    // }

    return endpoint; //, options
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {

    try {
        const response =  axios.get(
            this._getRequestData(params),
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            },
        )
        const data = (await response).data;//.data;
        console.log(data)
        return {success: true, data: data.data}; //в примере по другому

        // return {
        //     success: response.ok,
        //     data,
        //     status: response.status,
        // };
    } catch (e) {
        // return {
        //     success: false,
        //     data: null,
        //     status: StatusHTTP.UNEXPECTED_ERROR,
        // };
        console.log(e);
        return {
            success: false,
            data: null,
        }
    }
  }
}