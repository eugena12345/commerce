import { ParamsFromQuery, ParamsForApi } from 'store/CatalogStore/types';
import { pageSize } from 'store/CatalogStore/CatalogStore';

export const createParamsForApi = (params: ParamsFromQuery): ParamsForApi => {
    const paramsForApi: ParamsForApi = {
        populate: ['images', 'productCategory'],
        pagination: {
            page: 1,
            pageSize: pageSize,
        }
    };
    if (params.page) paramsForApi.pagination.page = params.page;
    if (params.filterByCategoryId && params.filterByCategoryId !== '') {
        if (paramsForApi.filters) {
            paramsForApi.filters.productCategory = {
                id: { $in: [params.filterByCategoryId] }
            }
        } else {
            const filterByCategoryIdColl = params.filterByCategoryId.split(',');
            paramsForApi.filters = {
                productCategory: {
                    id: { $in: filterByCategoryIdColl }
                }
            }
        }
    }

    if (params.filterByTitle && params.filterByTitle !== '') {
        if (paramsForApi.filters) {
            paramsForApi.filters.title = { $containsi: params.filterByTitle }
        } else {
            paramsForApi.filters = {
                title: {
                    $containsi: params.filterByTitle
                }
            }
        }
    };
    return paramsForApi;
};