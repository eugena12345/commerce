import { ProductCategory } from 'App/pages/CatalogPage/type';
import MultiDropdown from "App/pages/components/MultiDropdown/MultiDropdown";
import styles from './SearchByFilter.module.scss';
import { useSearchParams } from 'react-router';
import { observer, useLocalStore } from 'mobx-react-lite';
import CategoryStore from '../../../../../store/CategoryStore/CategoryStore';
import { useCallback, useEffect } from 'react';
import { Option } from 'App/pages/components/MultiDropdown/MultiDropdown';
import FiterValueStore from './../../../../../store/FilterValueStore/FilterValueStore';
import qs from 'qs';

const SearchByFilter = observer(() => {

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryStore = useLocalStore(() => new CategoryStore());
    const filterValueStore = useLocalStore(() => new FiterValueStore({ valueDefault: [] }))

    useEffect(() => {
        categoryStore.getCategories();
        const parsedParams = qs.parse(searchParams.toString(), { decode: true });
        if (parsedParams.filters?.productCategory) {
            filterValueStore.setValue(parsedParams.filters.productCategory.id.$in)
        }
    }, [categoryStore, filterValueStore, searchParams]);

    const getOptionsFromcategories = (categories: ProductCategory[]) => {
        return categories.map((item: ProductCategory) => {
            return { key: item.id, value: item.title }
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

    const getTitle = useCallback((): string => { //value: Option[]
        if (filterValueStore.value.length === 0) {
            return "Select options";
        }
        return filterValueStore.value.map((option) => option.value).join(", ");
    }, [filterValueStore.value]);

    return (
        <MultiDropdown
            options={getOptionsFromcategories(categoryStore.items)}
            value={filterValueStore.value}
            onChange={handleOnChange}
            getTitle={getTitle}
            className={styles['container__filter']}
        />
    )
}
);

export default SearchByFilter;