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

export type Image = {
    alternativeText: null | string,
    caption: null | string,
    createdAt: string,
    documentId: string,
    ext: string,
    hash: string,
    height: number,
    id: number,
    mime: string,
    name: string,
    previewUrl: null | string,
    provider: string,
    provider_metadata: null,
    publishedAt: string,
    size: number,
    updatedAt: string,
    url: string,
    width: number,
}

export type ProductCategory = {
    createdAt: string,
    documentId: string,
    id: number,
    publishedAt: string,
    title: string,
    updatedAt: string,
}

export type ProductType = {
    createdAt: string,
    description: string,
    discountPercent: number,
    documentId: string,
    id: number,
    isInStock: boolean,
    price: number,
    publishedAt: string,
    rating: number,
    title: string,
    updatedAt: string,
    images: Image[],
    productCategory: ProductCategory,
}


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
    console.log(queryString);
    const url = `${STRAPI_URL}${queryString}`;

    useEffect(() => {
        console.log('hello');
        axios.get(
            url,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            },
        ).then((response) => {
            console.log(response.data);
            setItems(
                [...response.data.data]
            );
            setTotalItems(response.data.meta.pagination.total)
        });


    }, []);
    
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.containerMaxWidth}>
                <ProductsInfo />
                <SearchProducts totalItems={totalItems} />
                <div className={styles.products}>
                    {items.length > 0 &&
                        items.map((item) => <div className={styles.routesDiv} key={item.id} onClick={() => navigate(routes.product.create(item.documentId))}>
                            <InfoCard image={item.images[0].url}
                                captionSlot={item.productCategory.title}
                                title={item.title}
                                subtitle={item.description}
                                contentSlot={item.price}
                                actionSlot={<Button>Add to Cart</Button>}
                            />
                        </div>)}
                </div>
                <Pagination/>
            </div>

        </div>
    );
}

export default CatalogPage;