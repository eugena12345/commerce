import { ProductCategory } from 'pages/CatalogPage/type';
import MultiDropdown, { Option } from 'pages/components/MultiDropdown';
import styles from './SearchByFilter.module.scss';
import { useSearchParams } from 'react-router';
import { observer, useLocalStore } from 'mobx-react-lite';
import CategoryStore from 'store/CategoryStore';
import { useCallback, useEffect } from 'react';
import FiterValueStore from 'store/FilterValueStore';
import qs from 'qs';
import React from 'react';

const SearchByFilter = observer(() => {

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryStore = useLocalStore(() => new CategoryStore());
    const filterValueStore = useLocalStore(() => new FiterValueStore({ valueDefault: [] }))

    useEffect(() => {

        const loadCategory = async () => {
            await categoryStore.getCategories();
            const categories = categoryStore.items;
            const parsedParams = qs.parse(searchParams.toString(), { decode: true });
            if (parsedParams.filterByCategoryId) {
                const categoryIdColl = parsedParams.filterByCategoryId.split(',')
                const option = categoryIdColl.map((id: string) => {
                    const category = categories.find((item) => item.id === Number(id));
                    if (category) {
                        return { key: id, value: category.title };
                    }
                    return null;
                })
                    .filter(Boolean);
                filterValueStore.setValue(option);
            }
        }
        loadCategory();
    }, [categoryStore, filterValueStore, searchParams]);

    const getOptionsFromCategories = (categories: ProductCategory[]) => {
        return categories.map((item: ProductCategory) => {
            return { key: item.id.toString(), value: item.title }
        })
    }

    const handleOnChange = useCallback((value: Option[]) => {
        filterValueStore.setValue(value);

        const createProductCategotColl = () => {
            const result: string[] = [];
            value.map((item) => result.push(item.key.toString()))
            return result;
        }
        searchParams.set('filterByCategoryId', createProductCategotColl().join(','));
        searchParams.set('page', '1');
        setSearchParams(searchParams);


    }, [filterValueStore, searchParams, setSearchParams]);

    const getTitle = useCallback((elements: Option[]) => elements.map((el: Option) => el.value).join(', '), []);

    return (
        <MultiDropdown
            options={getOptionsFromCategories(categoryStore.items)}
            value={filterValueStore.value}
            onChange={handleOnChange}
            getTitle={getTitle}
            className={styles.containerFilter}
        />
    )
}
);

export default SearchByFilter;