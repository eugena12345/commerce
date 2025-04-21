import styles from './Recommendation.module.scss';
import Text from 'components/Text/Text';
import InfoCard from 'App/pages/components/InfoCard/InfoCard';
import { ProductType } from 'App/pages/CatalogPage/type';
import Button from 'components/Button/Button';
import { observer, useLocalStore } from 'mobx-react-lite';
import RecommendationStore from 'store/RecommendationStore';
import { useEffect } from 'react';
import { addToCart } from 'utils/helpers';

type RecommendationProps = {
    item: ProductType;
}

const Recommendation: React.FC<RecommendationProps> = observer(({ item }) => {
    const recommendationStore = useLocalStore(() => new RecommendationStore());
    useEffect(() => {
        const productCategoryId = item.productCategory.id.toString();
        recommendationStore.getCategoryItems(productCategoryId);
    }, [item.productCategory.id, recommendationStore]);

    return (
        <>
            <Text className={styles.relatedTitle} view='p-20' color='primary' weight='bold'>Related Items</Text>
            <div className={styles.relatedItems}>
                {recommendationStore.items.length > 0 &&
                    <>
                        {
                            recommendationStore.items.map((recommendatedProduct) => {
                                return (
                                    <InfoCard
                                        image={recommendatedProduct.images[0].url}
                                        title={recommendatedProduct.title}
                                        subtitle={recommendatedProduct.description}
                                        contentSlot={recommendatedProduct.price}
                                        actionSlot={<Button onClick={(e) => addToCart(e, recommendatedProduct)}>Add to Cart</Button>}
                                        itemDocumentId={recommendatedProduct.documentId}
                                    />
                                )
                            })
                        }
                    </>
                }
            </div>
        </>
    )
}
);

export default Recommendation;