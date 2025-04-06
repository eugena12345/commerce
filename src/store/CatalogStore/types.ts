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
    filters?: {},
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
                $eq: number,
            }
        },
        title?: {
            $containsi: string,
        },

    }
    sort?: {},
}
