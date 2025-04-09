import { action, computed, makeObservable, observable } from "mobx";
import { ProductType } from 'App/pages/CatalogPage/type';
import ApiStore from "./../ApiStore/ApiStore";
import { MetaInfo} from '../CatalogStore/types';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api/product-categories?`;

const initialMeta = {
    pagination: {
        page: 1,
        pageCount: 1,   
        pageSize: 1,
        total: 0
    } 
}

type PrivateFields = '_items' | '_metaInfo';

export default class CategoryStore  {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _items: ProductType[] = [];
    private _metaInfo: MetaInfo = initialMeta;

    constructor() {
        makeObservable<CategoryStore, PrivateFields>(this, {
            _items: observable,
            _metaInfo: observable,
            items: computed,
            metaInfo: computed,
            getCategories: action,
        })
    }

    get items() {
        return this._items;
    }

    get metaInfo() {
        return this._metaInfo;
    }

    async getCategories(
    ): Promise<void> {
        //this._meta = Meta.loading;
        this._items = [];

        const response = await this._apiStore.request<ProductType[]>({
            endpoint: ``, 
        });

        if (response.success) {
            // this._meta = Meta.success;
            this._items = [...response.data];
            this._metaInfo = response.metaInfo;
            return;
        }

        //this._meta = Meta.error;
    }

    reset(): void {
        this._items = [];
        //this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
}
