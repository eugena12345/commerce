import { useEffect } from "react";
import InfoCard from "../components/InfoCard";
import ProductsInfo from "../components/ProductsInfo";
import SearchProducts from "../components/SearchProducts";
import Button from "components/Button/Button";
import styles from './CatalogPage.module.scss';
import { useNavigate, useSearchParams } from "react-router";
import { routes } from "config/routes.config";
import Pagination from "App/pages/components/Pagination/Pagination";
import { observer, useLocalStore } from "mobx-react-lite";
import CatalogStore from "./../../../store/CatalogStore/CatalogStore"; //  TODO добавить алиас
import QueryStore from "../../../store/QueryStore/QueryStore"; //  TODO добавить алиас
import qs from "qs";
import { ParamsFromQuery } from '../../../store/CatalogStore/types';

const CatalogPage = observer(() => {

    const catalogStore = useLocalStore(() => new CatalogStore());
    const queryStore = useLocalStore(() => new QueryStore());
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const parsedParams = qs.parse(searchParams.toString(), { decode: true });

        if (parsedParams.page) queryStore.setPage(Number(parsedParams.page));
        // TODO if (parsedParams.sort) queryStore.setSort(parsedParams.sort as string);
        if (parsedParams.filters) queryStore.setFilters(parsedParams.filters as Record<string, any>);//TODO записать правильную типизацию
        catalogStore.getProducts(queryStore.getQueryParams()); 
    }, [catalogStore, queryStore, searchParams]);

    const navigate = useNavigate();
    const navigaveToProductPage = (documentId: string) => navigate(routes.product.create(documentId))

    const getProductByCategory = (params: ParamsFromQuery): void => {
            catalogStore.getProducts(params);
    }

    const resetFilter = ():void => {
        queryStore.setPage(1);
        queryStore.setFilters({});
        queryStore.updateUrl((queryString: string) => {
            setSearchParams(queryString); 
        });

        catalogStore.getProducts(queryStore.getQueryParams());
    }

    return (
        <div className={styles.container}>
            <div className={styles[`container--maxWidth`]}>
                <ProductsInfo />
                {catalogStore.items.length > 0 &&
                    <SearchProducts 
                    totalItems={catalogStore.metaInfo.pagination.total} 
                    callbackOnFilter={getProductByCategory}
                    queryStore={queryStore}
                    />
                }
                <Button onClick={resetFilter} >Reset filter</Button> 

            <div className={styles[`container__products`]}>
                {catalogStore.items.length > 0 &&
                    catalogStore.items.map((item) => {
                        return (
                            <InfoCard image={item.images[0].url}
                                captionSlot={item.productCategory.title}
                                title={item.title}
                                subtitle={item.description}
                                contentSlot={item.price}
                                actionSlot={<Button>Add to Cart</Button>}
                                key={item.id}
                                onClick={() => navigaveToProductPage(item.documentId)}
                            />
                        )
                    })
                }
            </div>
            {catalogStore.metaInfo.pagination.pageCount > 1 &&
        
                 <Pagination pageCount={catalogStore.metaInfo.pagination.pageCount}
                    actualPage={catalogStore.metaInfo.pagination.page}
                 onClick={catalogStore.getProducts}
                 queryStore={queryStore}
/>
            }
           
        </div>
        </div >
    );
});

export default CatalogPage;