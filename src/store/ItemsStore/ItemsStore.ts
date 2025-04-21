import { action, computed, makeObservable, observable } from "mobx";
import qs from 'qs';
import { ProductType } from 'App/pages/CatalogPage/type';
import ApiStore from "./../ApiStore/ApiStore";
import {Meta} from './../CatalogStore/CatalogStore';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api/products/`;
const params = {
    populate: ['images', 'productCategory']
};
const queryString = qs.stringify(params);

type PrivateFields = '_itemInfo' | '_metaLoading';


export default class ItemsStore  {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _itemInfo: null | ProductType = null;
    private _metaLoading: Meta = Meta.initial;

    constructor() {
        makeObservable <ItemsStore, PrivateFields>(this, {
            _itemInfo: observable,
            _metaLoading: observable,
            itemInfo: computed,
            metaLoading: computed,
            getItemInfo: action,
        })
    }
    
    get itemInfo () {
        return this._itemInfo;
    }

    get metaLoading () {
        return this._metaLoading;
    }

    async getItemInfo(
        documentId: string
    ): Promise<void> {
        this._metaLoading = Meta.loading;
        this._itemInfo = null;

        const response = await this._apiStore.request({
            endpoint: `${documentId}?${queryString}`,
        });

        if (response.success) {
            this._metaLoading = Meta.success;
            this._itemInfo = response.data as ProductType;
            return;
        }

        this._metaLoading = Meta.error;
    }

    reset(): void {
        this._itemInfo = null;
        this._metaLoading = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
}




    

