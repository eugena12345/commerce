import { action, makeObservable, observable, runInAction } from "mobx";
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

export default class RecommendationStore { //implements implements ApiStore
    private readonly _catalogStore = new CatalogStore(); //
    _items: ProductType[] = []; //private
    _metaInfo: MetaInfo = initialMeta; //private


    constructor() {
        makeObservable(this, {
            _items: observable,
            getCategoryItems: action,
        })
    }

    async getCategoryItems(
        productCategoryId: string
    ): Promise<void> {

        //this._meta = Meta.loading;
        this._items = [];
        this._metaInfo = initialMeta;
        const paramsWithCategoryId = {
            filterByCategoryId: productCategoryId,
            filterByTitle: "",
            page: "1",
        };

        await this._catalogStore.getProducts(paramsWithCategoryId);
        runInAction(() => {
            // this._meta = Meta.success;
            this._items = this._catalogStore.items.splice(0, 3)
        });
    }



    reset(): void {
        this._items = [];
        //this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
}
