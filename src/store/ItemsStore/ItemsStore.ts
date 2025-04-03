import { action, makeAutoObservable, observable } from "mobx";
import qs from 'qs';
import { ProductType } from 'App/pages/CatalogPage/type';
import ApiStore from "./../ApiStore/ApiStore";
//import { GetOrganizationItem } from "./type";



//const API_TOKEN = 'f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef'
const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';



const STRAPI_URL = `${STRAPI_BASE_URL}/api/products/`;
const params = {
    populate: ['images', 'productCategory']
};
//const { id } = useParams();
//todo: в следующей строке возможно лучше поменять на реаальный id, а по id получить item и documentId
//const documentId = 'xs7uczb75mle3y2ctu01ulk9';
const queryString = qs.stringify(params);
//const url = `${STRAPI_URL}${documentId}?${queryString}`;


export default class ItemsStore  { //implements implements ApiStore
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    itemInfo: null | ProductType = null;
    //documentId: string | null = null;

    constructor() {

        makeAutoObservable(this, {
            itemInfo: observable,
            getItemInfo: action,

        })
    }

    // get itemInfo(): null | ProductType {
    //     return this._itemInfo;
    // }

    async getItemInfo(
        documentId: string
       // params: GetOrganizationItem
    ): Promise<void> {
        //console.log('i try to getItemInfo')
        //this._meta = Meta.loading;
        this.itemInfo = null;

        //////////////////////////////////
        // Конфиг запроса для qs:

        // {
        //   populate: ['images', 'productCategory']
        // }

        // ⚠️ Обратите внимание, для запроса используется не id, а documentId

        // Итоговый URL запроса:
        // https://front-school-strapi.ktsdev.ru/api/products/{documentId}?populate[0]=images&populate[1]=productCategory




        // запрос за списком репозиториев
        const response = await this._apiStore.request({
            endpoint: `${documentId}?${queryString}`,
            //headers: Record<string, string>,
            // data: ReqT,
        });

        //console.log('response from  getItemInfo',response)

        if (response.success) {
            // this._meta = Meta.success;
            this.itemInfo = response.data as ProductType;
            //response.data;
            return;
        }

        //this._meta = Meta.error;
    }

    reset(): void {
        this.itemInfo = null;
        //this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
}




    

