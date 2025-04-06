import { ProductCategory } from 'App/pages/CatalogPage/type';
import MultiDropdown from "App/pages/components/MultiDropdown/MultiDropdown";
import styles from './SearchByFilter.module.scss';
import { ParamsFromQuery } from '../../../../../store/CatalogStore/types';
import QueryStore from '../../../../../store/QueryStore/QueryStore';
import { useSearchParams } from 'react-router';
import { observer, useLocalStore } from 'mobx-react-lite';
import CategoryStore from  '../../../../../store/CategoryStore/CategoryStore';
import { useCallback, useEffect } from 'react';


interface SearchProductsProps {
    callbackOnFilter: (params: ParamsFromQuery) => void;
    queryStore: QueryStore;
    
}

const SearchByFilter = observer(({callbackOnFilter, queryStore}: SearchProductsProps) => {

    const [, setSearchParams] = useSearchParams();
    const categoryStore = useLocalStore(() => new CategoryStore());

    useEffect(() => {
        categoryStore.getCategories();

    }, [categoryStore]);


    const getOptionsFromcategories = (categories: ProductCategory[]) => {
        return categories.map((item: ProductCategory) => {
            return { key: item.id, value: item.title }
        })
    }

    const handleChange = () => {
    }
    const getTitle = () => {
        return ''
    }

    const handleChoise = useCallback((categoryId: number) => { 
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

        callbackOnFilter(queryStore.getQueryParams());
    },[callbackOnFilter, queryStore, setSearchParams]);


    return (
        <MultiDropdown
        options={getOptionsFromcategories(categoryStore.items)}
        value={[]}
        onChange={handleChange}
        getTitle={getTitle}
        className={styles['container__filter']}
        onChoice={handleChoise}
    />
    )
}
);

export default SearchByFilter;