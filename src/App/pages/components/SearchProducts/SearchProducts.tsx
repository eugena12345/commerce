import styles from './SearchProducts.module.scss';
import Input from "../Input/Input";
import Button from "components/Button/Button";
import MultiDropdown from "../MultiDropdown/MultiDropdown";
import Text from "components/Text/Text";
import { useState } from 'react';

interface SearchProductsProps {
    totalItems: number;
    callbackOnSearch: (searchQuery: string) => void
  }

const SearchProducts = ({totalItems, callbackOnSearch}: SearchProductsProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const handleInputChange = (searchQuery: string) => {
        setSearchQuery(searchQuery); // Обновляем значение строки
      };
    
    const handleChange = () => {
    }
    const getTitle = () => {
        return ''
    }

    const handleSearch = async () => await callbackOnSearch(searchQuery);
    return (
        <div className={styles.container}>
            <div className={styles['container__search']}>
                <Input placeholder="Search product" onChange={handleInputChange} value={searchQuery} className={styles['container__search--grow']}/>
                <Button onClick={handleSearch}>Find now</Button>
            </div>
           
                <MultiDropdown options={[]} value={[]} onChange={handleChange} getTitle={getTitle} className={styles['container__filter']}/>
            
            <div className={styles['container__result']}>
                <Text tag='h2' color='primary'>Total products</Text>
                <Text view='p-20' color='accent' weight='bold'>{totalItems}</Text>
            </div>

        </div>
    );
}

export default SearchProducts;