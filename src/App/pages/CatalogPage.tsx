const API_TOKEN = import.meta.env.VITE_API_TOKEN;


import React, { useEffect, useState } from "react";
import InfoCard from "./components/InfoCard";
import ProductsInfo from "./components/ProductsInfo";
import SearchProducts from "./components/SearchProducts";
import axios from 'axios';

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
updatedAt: string
}

const CatalogPage = () => {
    const [items, setItems] = useState<ProductType[]>([
    ]);

    const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
    const STRAPI_URL = `${STRAPI_BASE_URL}/api`;

 
    useEffect(() => {
        console.log('hello');
         axios.get(
            `${STRAPI_URL}/products`,
            {
                headers: {
                    // API_TOKEN нужно получить в боте при выборе проекта
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            },
        ).then((response)=>{
            console.log(response.data.data);
            setItems(
                [...response.data.data]
            )
        });
            
        
    }, []);
    return (
        <div>
            <ProductsInfo />
            <SearchProducts />
            {items.length > 0 &&
                items.map((item) => <div key={item.id}>{item.title}</div>)}
            <div><InfoCard /></div>
            <div><InfoCard /></div>
            <div><InfoCard /></div>

        </div>
    );
}

export default CatalogPage;