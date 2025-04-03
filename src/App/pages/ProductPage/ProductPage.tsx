// todo
// const API_TOKEN = import.meta.env.VITE_API_TOKEN;

import styles from './ProductPage.module.scss';
import Text from 'components/Text/Text';
//import { ProductType } from 'App/pages/CatalogPage/type';
import { useEffect } from 'react'; //, useState
//import axios from 'axios';
//import qs from 'qs';
import Button from 'components/Button/Button';
// todo: add image galery
//import arrowBack from 'assets/images/ArrowBack.svg';
import { useNavigate, useParams } from 'react-router'; //useParams
import arrowRight from 'assets/images/arrow-right.svg'
import { routes } from 'config/routes.config';
import Recomendation from 'App/pages/components/Recomendation/Recomendation';
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
                <Recomendation item={productsStore.itemInfo} />
            }
        </div>
    )
}
);

export default ProductPage;