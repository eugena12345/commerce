import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";
import qs from 'qs';
import { ProductType } from 'App/pages/CatalogPage/type';
import ApiStore from "./../ApiStore/ApiStore";
import { MetaInfo, ParamsFromQuery } from './types';
import { createParamsForApi } from '../../utils/api';
import rootStore from "../RootStore/instance";

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api/products?`;
export const pageSize = 6;

const initialMeta = {
    pagination: {
        page: 1,
        pageCount: 0,
        pageSize: pageSize,
        total: 0
    }
}

export enum Meta {
    initial = 'initial',
    loading = 'loading',
    error = 'error', 
    success = 'success'
  }

type PrivateFields = '_items' | '_metaInfo' | '_metaLoading';

export default class CatalogStore {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _items: ProductType[] = [];
    private _metaInfo: MetaInfo = initialMeta;
    private _metaLoading: Meta = Meta.initial;

    constructor() {
        makeObservable<CatalogStore, PrivateFields>(this, {
            _items: observable,
            _metaInfo: observable,
            _metaLoading: observable,
            items: computed,
            metaInfo: computed,
            metaLoading: computed,
            getProducts: action,
        })
    }

    get items() {
        return this._items;
    }

    get metaInfo() {
        return this._metaInfo;
    }

    get metaLoading() {
        return this._metaLoading;
    }

    getProducts = async (
        params: ParamsFromQuery
    ): Promise<void> => {
        this._metaLoading = Meta.loading;
        this._items = [];
        this._metaInfo = initialMeta;
        const queryStringForTest = qs.stringify(createParamsForApi(params));

        const response = await this._apiStore.request<ProductType[]>({
            endpoint: `${queryStringForTest}`,
        });

        if (response.success) {
            runInAction(() => {
                this._metaLoading = Meta.success;
                this._items = response.data;
                this._metaInfo = response.metaInfo;
            });
            return;
        }
        this._metaLoading = Meta.error;
    }

    reset(): void {
        this._items = [];
        this._metaLoading = Meta.initial;
    }

    destroy(): void {
        this.reset();
        this._qpReaction();
        this._qpReaction1();
        this._qpReaction2();
    }

    private readonly _qpReaction: IReactionDisposer = reaction(
        () => rootStore.query.getParam('filterByCategoryId'),
        () => {
            this.getProducts(rootStore.query.getQueryParams())
        }
    );

    private readonly _qpReaction1: IReactionDisposer = reaction(
        () => rootStore.query.getParam('filterByTitle'),
        () => {
            this.getProducts(rootStore.query.getQueryParams())
        }
    );

    private readonly _qpReaction2: IReactionDisposer = reaction(
        () => rootStore.query.getParam('page'),
        () => {
            this.getProducts(rootStore.query.getQueryParams())
        }
    );

}
