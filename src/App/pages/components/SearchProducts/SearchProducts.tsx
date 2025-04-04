import styles from './SearchProducts.module.scss';
import Input from "../Input/Input";
import Button from "components/Button/Button";
import MultiDropdown from "../MultiDropdown/MultiDropdown";
import Text from "components/Text/Text";
import { useEffect, useState } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import CategoryStore from '../../../../store/CategoryStore/CategoryStore';
import { ProductCategory } from 'App/pages/CatalogPage/type';

interface SearchProductsProps {
    totalItems: number;
    callbackOnSearch: (searchQuery: string) => void;
    callbackOnFilter: (filterId: number) => void;
}

const SearchProducts = observer((
    {
        totalItems, callbackOnSearch, callbackOnFilter
    }: SearchProductsProps) => {

    const [searchQuery, setSearchQuery] = useState("");

    const categoryStore = useLocalStore(() => new CategoryStore());

    useEffect(() => {
        categoryStore.getCategories();
    }, [categoryStore]);

    const handleInputChange = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };

    const handleChange = () => {
    }
    const getTitle = () => {
        return ''
    }

    const getOptionsFromcategories = (categories: ProductCategory[]) => {
        return categories.map((item: ProductCategory) => {
            return { key: item.id, value: item.title }
        })
    }

    const handleSearch = async () => await callbackOnSearch(searchQuery);
    return (
        <div className={styles.container}>
            <div className={styles['container__search']}>
                <Input placeholder="Search product" onChange={handleInputChange} value={searchQuery} className={styles['container__search--grow']} />
                <Button onClick={handleSearch}>Find now</Button>
            </div>

            <MultiDropdown
                options={getOptionsFromcategories(categoryStore.items)}
                value={[]}
                onChange={handleChange}
                getTitle={getTitle}
                className={styles['container__filter']}
                onChoice={callbackOnFilter}
            />

            <div className={styles['container__result']}>
                <Text tag='h2' color='primary'>Total products</Text>
                <Text view='p-20' color='accent' weight='bold'>{totalItems}</Text>
            </div>

        </div>
    );
}
);

export default SearchProducts;