import styles from './Recomendation.module.scss';
import Text from 'components/Text/Text';
import InfoCard from 'App/pages/components/InfoCard/InfoCard';
import { ProductType } from 'App/pages/CatalogPage/type';
import Button from 'components/Button/Button';

type RecomendationProps = {
    item: ProductType | null;
}

const Recomendation: React.FC<RecomendationProps> = ({item}) => {
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

export default Recomendation;