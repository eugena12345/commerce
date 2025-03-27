const API_TOKEN = import.meta.env.VITE_API_TOKEN;


import React, { useEffect, useState } from "react";
import InfoCard from "./components/InfoCard";
import ProductsInfo from "./components/ProductsInfo";
import SearchProducts from "./components/SearchProducts";
import axios from 'axios';
import Button from "../../components/Button/Button";
import styles from './CatalogPage.module.css';

type Image = {
    alternativeText: null | string,
    caption: null | string,
    createdAt: string,
    documentId: string,
    ext: string,
    // formats: 
    // {large: {…}, small: {…}, medium: {…}, thumbnail: {…}}
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

type ProductCategory = {
    createdAt: string,
    documentId: string,
    id: number,
    publishedAt: string,
    title: string,
    updatedAt: string,
}

type ProductType = {
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

const CatalogPage = () => {
    const [items, setItems] = useState<ProductType[]>([
    ]);

    //const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
    //const STRAPI_URL = `${STRAPI_BASE_URL}/api`;


    useEffect(() => {
        console.log('hello');
        axios.get(
            // `${STRAPI_URL}/products`,
            `https://front-school-strapi.ktsdev.ru/api/products?populate[0]=images&populate[1]=productCategory`,
            {
                headers: {
                    // API_TOKEN нужно получить в боте при выборе проекта
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            },
        ).then((response) => {
            console.log(response.data.data);
            setItems(
                [...response.data.data]
            )
        });


    }, []);
    return (
        <div className={styles.container}>
            <ProductsInfo />
            <SearchProducts />
            <div className={styles.products}>
                {items.length > 0 &&
                    items.map((item) => <div key={item.id}>
                        <InfoCard image={item.images[0].url}
                            captionSlot={item.productCategory.title}
                            title={item.title}
                            subtitle={item.description}
                            contentSlot={item.price}
                            actionSlot={<Button>Add to Cart</Button>}
                        /> </div>)}
            </div>


        </div>
    );
}

export default CatalogPage;