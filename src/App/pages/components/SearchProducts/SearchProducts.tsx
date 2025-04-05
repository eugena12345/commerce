import styles from './SearchProducts.module.scss';
import Input from "../Input/Input";
import Button from "components/Button/Button";
import MultiDropdown from "../MultiDropdown/MultiDropdown";
import Text from "components/Text/Text";
import { useEffect, useState } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import CategoryStore from '../../../../store/CategoryStore/CategoryStore';
import { ProductCategory } from 'App/pages/CatalogPage/type';
import QueryStore from '../../../../store/QueryStore/QueryStore';
import { useSearchParams } from 'react-router';
import { ParamsFromQuery } from '../../../../store/CatalogStore/types';
import qs from 'qs';

interface SearchProductsProps {
    totalItems: number;
    callbackOnFilter: (params: ParamsFromQuery) => void;
    queryStore: QueryStore
}

const SearchProducts = observer((
    {
        totalItems, callbackOnFilter, queryStore
    }: SearchProductsProps) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryStore = useLocalStore(() => new CategoryStore());

    useEffect(() => {
        categoryStore.getCategories();

        const parsedParams = qs.parse(searchParams.toString(), { decode: true });
        if (parsedParams.filters?.title) {
            setSearchQuery(parsedParams.filters.title.$containsi)
        } 
    }, [categoryStore, searchParams]);

    const handleInputChange = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };
//TODO  работа с мультидропом
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

    const handleSearch = async () => {
        const newFilter = {
            title: {
              $containsi: searchQuery,
            },
          };
        queryStore.setPage(1);
        queryStore.setFilters({
            ...queryStore.filters, 
            ...newFilter,          
        }); 
        queryStore.updateUrl((queryString: string) => {
            setSearchParams(queryString); 
        });

        await callbackOnFilter(queryStore.getQueryParams())
    };

    const handleChoise = async (categoryId: number) => { 
        const newFilter = {
            productCategory: {
                id: {
                  $eq: categoryId,
                }
              }
      };
        queryStore.setPage(1);
        queryStore.setFilters({
            ...queryStore.filters, 
            ...newFilter,          
        }); 
        queryStore.updateUrl((queryString: string) => {
            setSearchParams(queryString); 
        });

        await callbackOnFilter(queryStore.getQueryParams());
    };



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
                onChoice={handleChoise}
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