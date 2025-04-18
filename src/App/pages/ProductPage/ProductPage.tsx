import styles from './ProductPage.module.scss';
import Text from 'components/Text/Text';
import { useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import arrowBack from 'assets/images/ArrowBack.svg';
import arrowForward from 'assets/images/ArrowForward.svg';
import { useNavigate, useParams } from 'react-router';
import arrowRight from 'assets/images/arrow-right.svg'
import { routes } from 'config/routes.config';
import Recommendation from 'App/pages/components/Recommendation/Recommendation';
import { observer, useLocalStore } from 'mobx-react-lite';
import ItemsStore from 'store/ItemsStore';
import { Meta } from 'store/CatalogStore/CatalogStore';
import Loader from 'components/Loader';

const ProductPage = observer(() => {
    const { id } = useParams();
    const documentId = id;
    const productsStore = useLocalStore(() => new ItemsStore());
    const [imgNumber, setImgNumber] = useState(0);

    useEffect(() => {
        if (documentId) productsStore.getItemInfo(documentId);
    }, [productsStore, documentId]);

    const getNextImg = (currentImgIdx: number, ImgLength: number): void => {
        const newImgIdx = currentImgIdx < ImgLength - 1 ? currentImgIdx + 1 : 0;
        setImgNumber(newImgIdx);
    }

    const getPrevImg = (currentImgIdx: number, ImgLength: number): void => {
        const newImgIdx = currentImgIdx > 0 ? currentImgIdx - 1 : ImgLength - 1;
        setImgNumber(newImgIdx);
    }

    const navigate = useNavigate();
    return (
        <div className={styles.productpage}>
            <div className={styles['productpage--maxWidth']}>

                <div className={styles['productpage__back']} onClick={() => navigate(routes.main.create())}>
                    <img src={arrowRight} alt='' />
                    <Text className={styles.relatedTitle} view='p-20' color='primary'>Back</Text>

                </div>
                {productsStore.metaLoading === Meta.loading &&
                    <div className={styles['productpage__loader']}>
                        <Loader />
                    </div>
                }
                <div className={styles.card}>
                    {productsStore.itemInfo &&
                        <>
                            <div className={styles.productphoto}>
                                <div className={styles.arrow} onClick={() => getPrevImg(imgNumber, productsStore.itemInfo.images.length)}>
                                    <img src={arrowBack} alt="" />
                                </div>

                                <img src={productsStore.itemInfo.images[imgNumber].url} alt="картинка" />

                                <div className={styles.arrowForw} onClick={() => getNextImg(imgNumber, productsStore.itemInfo.images.length)}>
                                    <img src={arrowForward} alt="" />
                                </div>
                            </div>

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
        </div>
    )
}
);

export default ProductPage;