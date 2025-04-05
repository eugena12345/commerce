import styles from './Recomendation.module.scss';
import Text from 'components/Text/Text';
import InfoCard from 'App/pages/components/InfoCard/InfoCard';
import { ProductType } from 'App/pages/CatalogPage/type';
import Button from 'components/Button/Button';
import { observer, useLocalStore } from 'mobx-react-lite';
import RecomendationStore from './../../../../store/RecomendationStore/RecomendationStore';
import { useEffect } from 'react';
import CategoryStore from './../../../../store/CategoryStore/CategoryStore';

type RecomendationProps = {
    item: ProductType;
}

const Recomendation: React.FC<RecomendationProps> = observer(({ item }) => {

    const categoryStore = useLocalStore(() => new CategoryStore());

    const recomendationStore = useLocalStore(() => new RecomendationStore());
    const categoryDocumentId: string = item.productCategory.documentId;

    useEffect(() => {
        categoryStore.getCategories();
        recomendationStore.getCategoryItems(categoryDocumentId);
    }, [categoryDocumentId, categoryStore, recomendationStore]) 

    return (
        <>
            <Text className={styles.relatedTitle} view='p-20' color='primary' weight='bold'>Related Items</Text>
            <div className={styles.relatedItems}>
                {item &&
                    <>
                        <InfoCard image={item.images[0].url} title={item.title} subtitle={item.description} contentSlot={item.price} actionSlot={<Button>Add to Cart</Button>} />
                        <InfoCard image={item.images[0].url} title={item.title} subtitle={item.description} contentSlot={item.price} actionSlot={<Button>Add to Cart</Button>} />
                        <InfoCard image={item.images[0].url} title={item.title} subtitle={item.description} contentSlot={item.price} actionSlot={<Button>Add to Cart</Button>} />
                    </>
                }
            </div>

        </>
    )
}
);

export default Recomendation;