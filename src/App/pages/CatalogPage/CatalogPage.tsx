// const API_TOKEN = import.meta.env.VITE_API_TOKEN;

import { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import ProductsInfo from "../components/ProductsInfo";
import SearchProducts from "../components/SearchProducts";
import axios from 'axios';
import Button from "components/Button/Button";
import styles from './CatalogPage.module.scss';
import qs from 'qs';
import { useNavigate } from "react-router";
import { routes } from "config/routes.config";
import Pagination from "App/pages/components/Pagination/Pagination";
import { ProductType } from './type';



const API_TOKEN = 'f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef'

const CatalogPage = () => {
    const [items, setItems] = useState<ProductType[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);

    const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
    const STRAPI_URL = `${STRAPI_BASE_URL}/api/products?`;
    const params = {
        populate: ['images', 'productCategory']
    };
    const queryString = qs.stringify(params);
    const url = `${STRAPI_URL}${queryString}`;

    useEffect(() => {
        axios.get(
            url,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            },
        ).then((response) => {
            setItems(
                [...response.data.data]
            );
            setTotalItems(response.data.meta.pagination.total)
        });


    }, [url]);

    const navigate = useNavigate();
    const navigaveToProductPage = (documentId: string) => navigate(routes.product.create(documentId))

    return (
        <div className={styles.container}>
            <div className={styles[`container--maxWidth`]}>
                <ProductsInfo />
                <SearchProducts totalItems={totalItems} />
                <div className={styles[`container__products`]}>
                    {items.length > 0 &&
                        items.map((item) => {
                            return (
                                <InfoCard image={item.images[0].url}
                                    captionSlot={item.productCategory.title}
                                    title={item.title}
                                    subtitle={item.description}
                                    contentSlot={item.price}
                                    actionSlot={<Button>Add to Cart</Button>}
                                    key={item.id}
                                    onClick={() => navigaveToProductPage(item.documentId)}
                                />
                            )
                        })
                    }
                </div>
                <Pagination />
            </div>
        </div>
    );
}

export default CatalogPage;