import styles from './ProductPage.module.scss';
import Text from 'components/Text/Text';
import { useEffect } from 'react';
import Button from 'components/Button/Button';
// todo: add image galery
// todo: import arrowBack from 'assets/images/ArrowBack.svg';
import { useNavigate, useParams } from 'react-router';
import arrowRight from 'assets/images/arrow-right.svg'
import { routes } from 'config/routes.config';
import Recommendation from 'App/pages/components/Recommendation/Recommendation';
import { observer, useLocalStore } from 'mobx-react-lite';
import ItemsStore from '../../../store/ItemsStore/ItemsStore';

const ProductPage = observer(() => {
    const { id } = useParams();
    const documentId = id;
    const productsStore = useLocalStore(() => new ItemsStore());

    useEffect(() => {
        if (documentId) productsStore.getItemInfo(documentId);
    }, [productsStore, documentId]);

    const navigate = useNavigate();
    return (
        <div className={styles.productpage}>
            <div className={styles['productpage__back']} onClick={() => navigate(routes.main.create())}>
                <img src={arrowRight} alt='' />
                <Text className={styles.relatedTitle} view='p-20' color='primary'>Back</Text>

            </div>
            <div className={styles.card}>
                {productsStore.itemInfo &&
                    <>
                        <img src={productsStore.itemInfo.images[0].url} alt="картинка" />
                        {/* TODO
                        <div className={styles.arrow}>
                            <img src={arrowBack} alt="" />
                        </div> */}
                        <div className={styles['card__description']}>

                            <Text view='title' color='primary'>{productsStore.itemInfo.title}</Text>
                            <Text view='p-16' color='secondary'>{productsStore.itemInfo.description}</Text>
                            <Text view='title' color='primary'>${productsStore.itemInfo.price}</Text>
                            <div className={styles.buttongroup}>
                                <Button>Buy Now</Button>
                                <Button>Add to Cart</Button>
                            </div>
                        </div>
                    </>
                }
            </div>
            {productsStore.itemInfo &&
                <Recommendation item={productsStore.itemInfo} />
            }
        </div>
    )
}
);

export default ProductPage;