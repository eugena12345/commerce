import { useEffect } from "react";
import InfoCard from "../components/InfoCard";
import ProductsInfo from "../components/ProductsInfo";
import SearchProducts from "../components/SearchProducts";
import Button from "components/Button/Button";
import styles from './CatalogPage.module.scss';
import Pagination from "App/pages/components/Pagination/Pagination";
import { observer, useLocalStore } from "mobx-react-lite";
import CatalogStore from "./../../../store/CatalogStore/CatalogStore"; //  TODO добавить алиас
import rootStore from "./../../../store/RootStore/instance";
import Loader from "components/Loader";
import Text from "components/Text";
import { Meta } from "./../../../store/CatalogStore/CatalogStore";

const CatalogPage = observer(() => {

    const catalogStore = useLocalStore(() => new CatalogStore());
    useEffect(() => {
        catalogStore.getProducts(rootStore.query.getQueryParams())
    }, [catalogStore]);

    return (
        <div className={styles.container}>
            <div className={styles[`container--maxWidth`]}>
                <ProductsInfo />

                <SearchProducts
                    totalItems={catalogStore.metaInfo.pagination.total}
                    metaLoading={catalogStore.metaLoading}
                />
                {(catalogStore.metaLoading === Meta.success && catalogStore.items.length === 0) &&
                    <Text view='p-20' color='secondary'>No products found matching the filters you specified. Please change your query or reset your filters.</Text>}

                {catalogStore.metaLoading === Meta.loading &&
                    <Loader />
                }

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
                                    itemDocumentId={item.documentId}
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