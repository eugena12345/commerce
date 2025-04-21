import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { ProductType } from 'App/pages/CatalogPage/type';
import { MetaInfo } from '../CatalogStore/types';
import CatalogStore, {pageSize} from './../CatalogStore/CatalogStore';

const initialMeta = {
    pagination: {
        page: 1,
        pageCount: 1,
        pageSize: pageSize,
        total: 0
    }
}

type PrivateFields = '_items' | '_metaInfo';


export default class RecommendationStore {
    private readonly _catalogStore = new CatalogStore();
    private _items: ProductType[] = [];
    private _metaInfo: MetaInfo = initialMeta;


    constructor() {
        makeObservable<RecommendationStore, PrivateFields>(this, {
            _items: observable,
            _metaInfo: observable,
            items: computed,
            metaInfo: computed,
            getCategoryItems: action,
        })
    }

    get items () {
        return this._items;
    }

    get metaInfo () {
        return this._metaInfo;
    }

    async getCategoryItems(
        productCategoryId: string
    ): Promise<void> {

        //Todo this._meta = Meta.loading;
        this._items = [];
        this._metaInfo = initialMeta;
        const paramsWithCategoryId = {
            filterByCategoryId: productCategoryId,
            filterByTitle: "",
            page: "1",
        };

        await this._catalogStore.getProducts(paramsWithCategoryId);
        runInAction(() => {
            //Todo this._meta = Meta.success;
            this._items = this._catalogStore.items.splice(0, 3)
        });
    }



    reset(): void {
        this._items = [];
        //Todo this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
}
