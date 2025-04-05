import { action, makeAutoObservable, observable } from "mobx";
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

export default class CategoryStore  { //implements implements ApiStore
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    items: ProductType[] = [];
    metaInfo: MetaInfo = initialMeta;

    constructor() {
        makeAutoObservable(this, {
            items: observable,
            getCategories: action,
        })
    }

    async getCategories(
    ): Promise<void> {
        //this._meta = Meta.loading;
        this.items = [];

        const response = await this._apiStore.request<ProductType[]>({
            endpoint: ``, 
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
