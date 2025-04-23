import { action, computed, makeObservable, observable } from "mobx";
//import { ProductType } from 'App/pages/CatalogPage/type';
import ApiStore from "./../ApiStore/ApiStore";
import { MetaInfo } from '../CatalogStore/types';
import { createParamsForCategoriesApi } from "utils/api";
import qs from "qs";

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api/product-categories?`;

type CategoryType = {
    createdAt: string,
    documentId: string,
    id: number,
    image:
    {
        id: number,
        documentId: string,
        name: string,
        alternativeText: string | null,
        caption: string | null,
        url: string
    },
    publishedAt: string,
    title: string,
    updatedAt: string,
}

const initialMeta = {
    pagination: {
        page: 1,
        pageCount: 1,
        pageSize: 1,
        total: 0
    }
}

type PrivateFields = '_items' | '_metaInfo';

export default class CategoryStore {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _items: CategoryType[] = [];
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
        this._items = [];
        const queryString = qs.stringify(createParamsForCategoriesApi());


        const response = await this._apiStore.request<CategoryType[]>({
            endpoint: `${queryString}`,
        });

        if (response.success) {
            this._items = [...response.data];
            this._metaInfo = response.metaInfo;
            return;
        }

    }

    reset(): void {
        this._items = [];
    }

    destroy(): void {
        this.reset();
    }
}
