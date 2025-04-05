import { action, makeAutoObservable, observable, toJS } from "mobx";
import qs from 'qs';
import { ProductType } from 'App/pages/CatalogPage/type';
import ApiStore from "./../ApiStore/ApiStore";
import { MetaInfo, ParamsForApi, ParamsFromQuery } from './types';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api/products?`;

// const getUsualParams = (pageNumber?: number) => {
//     const params = {
//         populate: ['images', 'productCategory'],
//         pagination: {
//             page: pageNumber? pageNumber : 1,
//             pageSize: 6,
//         }
            
//     };
//     const queryString = qs.stringify(params);
//     return queryString;
// }

const initialMeta = {
    pagination: {
        page: 1,
        pageCount: 0,
        pageSize: 6,
        total: 0
    }
}

// const filteredParams = {

//     populate: ['images', 'productCategory'],
//     filters: {
//         title: {
//             $containsi: 'phone',
//         },
//     }

// };
// const queryStringWithFilter = qs.stringify(filteredParams);

// const getQsParams = (string: string) => {
//     const params = {
//         populate: ['images', 'productCategory'],
//         filters: {
//             title: {
//                 $containsi: string,
//             },
//         }
//         };
//     const queryParams = qs.stringify(params);
//     return queryParams;
// }

// const getQsFilterParams = (categoryId: number) => {
//     const params = {
//         populate: ['images', 'productCategory'],
//         filters: {
//           productCategory: {
//             id: {
//               $eq: categoryId,
//             }
//           }
//         }
//     };
//     const queryParams = qs.stringify(params);

//     return queryParams;
// }

const createParamsForApi = (params: ParamsFromQuery): ParamsForApi => {
    const paramsForApi: ParamsForApi = {
        populate: ['images', 'productCategory'],
        pagination: {
            page: 1,
            pageSize: 6,
        }
    };
    if (params.page) paramsForApi.pagination.page = params.page;
    if (params.filters) paramsForApi.filters = params.filters;
    return paramsForApi;
};

export default class CatalogStore { //TODO разобраться implements implements ApiStore
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    items: ProductType[] = [];
    metaInfo: MetaInfo = initialMeta;
    

    constructor() {
        makeAutoObservable(this, {
            items: observable,
            metaInfo: observable,
            getProducts: action,
           // getFilteredProducts: action
        })
    }

    getProducts =async (
        params: ParamsFromQuery
    ): Promise<void> => {
        //this._meta = Meta.loading;
        this.items = [];
        this.metaInfo = initialMeta;

        const queryString = qs.stringify(createParamsForApi(params));

        const response = await this._apiStore.request<ProductType[]>({
            endpoint: `${queryString}`,
            //headers: Record<string, string>,
            // data: ReqT,
        });

        if (response.success) {
            // this._meta = Meta.success;
            this.items = [...response.data];
            this.metaInfo = response.metaInfo;
            return;
        }

        //this._meta = Meta.error;
    }

    // getFilteredProducts = async (
    //     stringForSearch: string
    // ): Promise<void> => {
    //     //this._meta = Meta.loading;
    //     this.items = [];
    //     this.metaInfo = initialMeta;

    //     const qsFiltered = getQsParams(stringForSearch);

    //     const response = await this._apiStore.request<ProductType[]>({
    //         endpoint: `${qsFiltered}`, 
    //         //queryStringWithFilter
    //         //headers: Record<string, string>,
    //         // data: ReqT,
    //     });

    //     if (response.success) {
    //         // this._meta = Meta.success;
    //         this.items = [...response.data];
    //         this.metaInfo = response.metaInfo;
    //         return;
    //     }

    //     //this._meta = Meta.error;
    // }

    // getOneCategoryProducts = async (
    //     categoryId: number
    // ): Promise<void> => {
    //     //this._meta = Meta.loading;
    //     this.items = [];
    //     this.metaInfo = initialMeta;

    //     const qsFilteredCategory = getQsFilterParams(categoryId);

    //     const response = await this._apiStore.request<ProductType[]>({
    //         endpoint: `${qsFilteredCategory}`, //queryStringWithFilter
    //         //headers: Record<string, string>,
    //         // data: ReqT,
    //     });

    //     if (response.success) {
    //         // this._meta = Meta.success;
    //         this.items = [...response.data];
    //         this.metaInfo = response.metaInfo;
    //         return;
    //     }

    //     //this._meta = Meta.error;
    // }




    reset(): void {
        this.items = [];
        //this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
}
