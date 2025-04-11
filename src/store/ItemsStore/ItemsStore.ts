import { action, computed, makeObservable, observable } from "mobx";
import qs from 'qs';
import { ProductType } from 'App/pages/CatalogPage/type';
import ApiStore from "./../ApiStore/ApiStore";

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api/products/`;
const params = {
    populate: ['images', 'productCategory']
};
const queryString = qs.stringify(params);

type PrivateFields = '_itemInfo';


export default class ItemsStore  { //implements implements ApiStore
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _itemInfo: null | ProductType = null;
    constructor() {
        makeObservable <ItemsStore, PrivateFields>(this, {
            _itemInfo: observable,
            itemInfo: computed,
            getItemInfo: action,
        })
    }
    
    get itemInfo () {
        return this._itemInfo;
    }

    async getItemInfo(
        documentId: string
    ): Promise<void> {
        //this._meta = Meta.loading;
        this._itemInfo = null;

        const response = await this._apiStore.request({
            endpoint: `${documentId}?${queryString}`,
        });

        if (response.success) {
            // this._meta = Meta.success;
            this._itemInfo = response.data as ProductType;
            return;
        }

        //this._meta = Meta.error;
    }

    reset(): void {
        this._itemInfo = null;
        //this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
}




    

