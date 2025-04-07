import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction, toJS } from "mobx";
import qs from 'qs';
import { ProductType } from 'App/pages/CatalogPage/type';
import ApiStore from "./../ApiStore/ApiStore";
import { MetaInfo, ParamsFromQuery2 } from './types';
import { createParamsForApi2 } from '../../utils/api';
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

type PrivateFields = '_items' | '_metaInfo';

export default class CatalogStore { //TODO разобраться implements implements ApiStore
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _items: ProductType[] = [];
    private _metaInfo: MetaInfo = initialMeta;


    constructor() {
        makeObservable<CatalogStore, PrivateFields>(this, {
            _items: observable,
            _metaInfo: observable,
            items: computed,
            metaInfo: computed,
            getProducts: action,
        })
    }

    get items() {
        return this._items;
    }

    get metaInfo() {
        return this._metaInfo;
    }

    getProducts = async (
        params: ParamsFromQuery2
        //params: ParamsFromQuery
    ): Promise<void> => {
        //this._meta = Meta.loading;
        this._items = [];
        this._metaInfo = initialMeta;
        const queryStringForTest = qs.stringify(createParamsForApi2(params));

        const response = await this._apiStore.request<ProductType[]>({
            endpoint: `${queryStringForTest}`,
            //headers: Record<string, string>,
            // data: ReqT,
        });

        if (response.success) {
            runInAction(() => {
                // this._meta = Meta.success;
                this._items = response.data;
                this._metaInfo = response.metaInfo;
            });
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
        this._qpReaction();
        this._qpReaction1();
        this._qpReaction2();
    }

    private readonly _qpReaction: IReactionDisposer = reaction(
        () => rootStore.query.getParam('filterByCategoryId'),
        () => {
            this.getProducts(rootStore.query.getQueryParams2())
        }
    );

    private readonly _qpReaction1: IReactionDisposer = reaction(
        () => rootStore.query.getParam('filterByTitle'),
        () => {
            this.getProducts(rootStore.query.getQueryParams2())
        }
    );

    private readonly _qpReaction2: IReactionDisposer = reaction(
        () => rootStore.query.getParam('page'),
        () => {
            this.getProducts(rootStore.query.getQueryParams2())
        }
    );

}
