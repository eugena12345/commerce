// todo
// const API_TOKEN = import.meta.env.VITE_API_TOKEN;

import styles from './ProductPage.module.scss';
import Text from 'components/Text/Text';
import { ProductType } from 'App/pages/CatalogPage/CatalogPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import Button from 'components/Button/Button';
// todo: add image galery
//import arrowBack from 'assets/images/ArrowBack.svg';
import { useNavigate, useParams } from 'react-router';
import arrowRight from 'assets/images/arrow-right.svg'
import { routes } from 'config/routes.config';
import Recomendation from 'App/pages/components/Recomendation/Recomendation';

const API_TOKEN = 'f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef'

const ProductPage = () => {
    const [item, setItem] = useState<ProductType | null>(null);
    const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
    const STRAPI_URL = `${STRAPI_BASE_URL}/api/products/`;
    const params = {
        populate: ['images', 'productCategory']
    };
    const { id } = useParams();
    //todo: в следующей строке возможно лучше поменять на реаальный id, а по id получить item и documentId
    const documentId = id;
    const queryString = qs.stringify(params);
    const url = `${STRAPI_URL}${documentId}?${queryString}`;

    useEffect(() => {
        axios.get(
            url,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            },
        ).then((response) => {
            setItem(response.data.data);
        });

    }, [url]);

    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.back} onClick={() => navigate(routes.main.create())}>
                <img src={arrowRight} alt='' />
                <Text className={styles.relatedTitle} view='p-20' color='primary'>Back</Text>

            </div>
            <div className={styles.itemCard}>
                {item &&
                    <>
                        <img src={item.images[0].url} alt="картинка" />
                        {/* TODO
                        <div className={styles.arrow}>
                            <img src={arrowBack} alt="" />
                        </div> */}
                        <div className={styles.descriptionItem}>

                            <Text view='title' color='primary'>{item.title}</Text>
                            <Text view='p-16' color='secondary'>{item.description}</Text>
                            <Text view='title' color='primary'>${item.price}</Text>
                            <div className={styles.buttonGroup}>
                                <Button>Buy Now</Button>
                                <Button>Add to Cart</Button>
                            </div>
                        </div>
                    </>
                }
            </div>
            <Recomendation item={item} />
        </div>
    )
};

export default ProductPage;