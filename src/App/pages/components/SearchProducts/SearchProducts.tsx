//import React from "react";
import styles from './SearchProducts.module.scss';
import Input from "../Input/Input";
import Button from "components/Button/Button";
import MultiDropdown from "../MultiDropdown/MultiDropdown";
import Text from "components/Text/Text";

interface SearchProductsProps {
    totalItems: number;
  }

const SearchProducts = ({totalItems}: SearchProductsProps) => {
    const handleChange = () => {
        console.log('i want to be changed');
    }
    const getTitle = () => {
        return ''
    }
    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <Input placeholder="Search product" onChange={handleChange} value='' className={styles.grow}/>
                <Button>Find now</Button>
            </div>
           
                <MultiDropdown options={[]} value={[]} onChange={handleChange} getTitle={getTitle} className={styles.filter}/>
            
            <div className={styles.result}>
                <Text tag='h2' color='primary'>Total products</Text>
                <Text view='p-20' color='accent' weight='bold'>{totalItems}</Text>
            </div>

        </div>
    );
}

export default SearchProducts;