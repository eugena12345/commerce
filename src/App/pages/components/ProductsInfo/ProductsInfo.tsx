//import React from "react";
import { memo } from 'react';
import styles from './ProductsInfo.module.scss';
import Text from "components/Text/Text";

const ProductsInfo = () => {
    return (
        <div className={styles.container}>
            <Text view='title' color='primary'>Products</Text>
            <Text view='p-20' color='secondary'>We display products based on the latest products we have, if you want
            to see our old products please enter the name of the item</Text>
        </div>
    )
}

export default memo(ProductsInfo);