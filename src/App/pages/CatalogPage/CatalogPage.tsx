import { useEffect } from "react";
import InfoCard from 'pages/components/InfoCard';
import ProductsInfo from 'pages/components/ProductsInfo';
import SearchProducts from 'pages/components/SearchProducts'
import Button from 'components/Button';
import styles from './CatalogPage.module.scss';
import Pagination from 'pages/components/Pagination';
import { observer, useLocalStore } from "mobx-react-lite";
import CatalogStore from 'store/CatalogStore'
import rootStore from 'store/RootStore/instance';
import React from "react";

// наименование стелей в styles
// container
// containerMaxWidth
// containerProducts

const CatalogPage = observer(() => {

    const catalogStore = useLocalStore(() => new CatalogStore());
     useEffect(() => {
        catalogStore.getProducts(rootStore.query.getQueryParams())
     }, [catalogStore]);

    return (
        <div className={styles.container}>
            <div className={styles.containerMaxWidth}>
                <ProductsInfo />
                {catalogStore.items.length > 0 &&
                    <SearchProducts
                        totalItems={catalogStore.metaInfo.pagination.total}
                    />
                }

                <div className={styles.containerProducts}>
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