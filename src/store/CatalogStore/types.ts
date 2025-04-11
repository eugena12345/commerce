export type MetaInfo = {
    pagination: {
        page: number,
        pageCount: number,
        pageSize: number,
        total: number
    }
}

export type ParamsFromQuery = {
    page?: number | string,
    filterByCategoryId?: string,
    filterByTitle?: string,
    sort?: {},
}

export type ParamsForApi = {
    populate: string[],
    pagination: {
        page?: number| string,
        pageSize?: number,

    }
    filters?: {
        productCategory?: {
            id: {
                $in: string[]
            }
        },
        title?: {
            $containsi: string,
        },

    }
    sort?: {},
}
