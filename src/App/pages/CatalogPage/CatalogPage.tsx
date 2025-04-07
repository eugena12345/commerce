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
import qs from "qs";
import { useStoreContext } from "./../../../store/RootStore/context/rootStoreContext";

const CatalogPage = observer(() => {

    const catalogStore = useLocalStore(() => new CatalogStore());
    const [searchParams, setSearchParams] = useSearchParams();
    const rootStore = useStoreContext();

    useEffect(() => {
        const parsedParams = qs.parse(searchParams.toString(), { decode: true });
        if (parsedParams.page) rootStore.query.setPage(Number(parsedParams.page));
        if (parsedParams.filters) rootStore.query.setFilters(parsedParams.filters as Record<string, any>);//TODO записать правильную типизацию
    }, [catalogStore, rootStore, searchParams]);

    const navigate = useNavigate();
    const navigaveToProductPage = (documentId: string) => navigate(routes.product.create(documentId))

    const resetFilter = (): void => {
        rootStore.query.setPage(1);
        rootStore.query.setFilters({});
        rootStore.query.updateUrl((queryString: string) => {
            setSearchParams(queryString);
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles[`container--maxWidth`]}>
                <ProductsInfo />
                {catalogStore.items.length > 0 &&
                    <SearchProducts
                        totalItems={catalogStore.metaInfo.pagination.total}
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
                    />
                }

            </div>
        </div >
    );
});

export default CatalogPage;