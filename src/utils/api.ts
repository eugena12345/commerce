import { ParamsFromQuery, ParamsForApi } from '../store/CatalogStore/types';
import { pageSize } from '../store/CatalogStore//CatalogStore';


export const createParamsForApi = (params: ParamsFromQuery): ParamsForApi => {
    const paramsForApi: ParamsForApi = {
        populate: ['images', 'productCategory'],
        pagination: {
            page: 1,
            pageSize: pageSize,
        }
    };
    if (params.page) paramsForApi.pagination.page = params.page;
    if (params.filters) paramsForApi.filters = params.filters;
    return paramsForApi;
};