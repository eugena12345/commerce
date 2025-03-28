
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

import styles from './ProductPage.module.css';
import Text from 'components/Text/Text';
import { ProductType } from 'App/pages/CatalogPage/CatalogPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import Button from 'components/Button/Button';
import InfoCard from 'App/pages/components/InfoCard/InfoCard';
import arrowBack from 'assets/images/ArrowBack.svg';
import { useParams } from 'react-router';


const ProductPage = () => {
    const [item, setItem] = useState<ProductType | null>(null);
    //https://front-school-strapi.ktsdev.ru/api/products/{documentId}?populate[0]=images&populate[1]=productCategory

    const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
    const STRAPI_URL = `${STRAPI_BASE_URL}/api/products/`;
    const params = {
        populate: ['images', 'productCategory']
    };
    const {id} = useParams();
    //в следующей строке возможно лучше поменять на реаальный id, а по id получить item и documentId
    const documentId = id;
    const queryString = qs.stringify(params);
    console.log(queryString);
    const url = `${STRAPI_URL}${documentId}?${queryString}`;

    useEffect(() => {
        console.log('Single Item');
        axios.get(
            url,
            {
                headers: {
                    // API_TOKEN нужно получить в боте при выборе проекта
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            },
        ).then((response) => {
            console.log(response.data.data);
            setItem(response.data.data);
        });


    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.back}>
            <Text className={styles.relatedTitle} view='p-20' color='primary'>Back</Text>

            </div>
            <div className={styles.itemCard}>
                {item &&
                    <>
                        <img src={item.images[0].url} alt="картинка" />
                        <div  className={styles.arrow}>
                        <img src={arrowBack} alt="" />

                        </div>
                        <div className={styles.descriptionItem}>

                            <Text view='title'>{item.title}</Text>
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
            <Text className={styles.relatedTitle} view='p-20' color='primary' weight='bold'>Related Items</Text>
            <div className={styles.relatedItems}>
                {item &&
                    <>
                        <InfoCard image={item.images[0].url} title={item.title} subtitle={item.description} contentSlot={item.price} actionSlot={<Button>Add to Cart</Button>}/>
                        <InfoCard image={item.images[0].url} title={item.title} subtitle={item.description} contentSlot={item.price} actionSlot={<Button>Add to Cart</Button>}/>
                        <InfoCard image={item.images[0].url} title={item.title} subtitle={item.description} contentSlot={item.price} actionSlot={<Button>Add to Cart</Button>}/>
                    </>
                }
            </div>
        </div>
    )
};

export default ProductPage;