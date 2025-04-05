import { action, makeAutoObservable, observable } from "mobx";
import qs from 'qs';
import { ProductType } from 'App/pages/CatalogPage/type';
import ApiStore from "./../ApiStore/ApiStore";
import { MetaInfo, ParamsForApi, ParamsFromQuery } from './types';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api/products?`;

const initialMeta = {
    pagination: {
        page: 1,
        pageCount: 0,
        pageSize: 6,
        total: 0
    }
}

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

    reset(): void {
        this.items = [];
        //this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
}
