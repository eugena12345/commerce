import { ProductCategory } from 'App/pages/CatalogPage/type';
import MultiDropdown from "App/pages/components/MultiDropdown/MultiDropdown";
import styles from './SearchByFilter.module.scss';
import { useSearchParams } from 'react-router';
import { observer, useLocalStore } from 'mobx-react-lite';
import CategoryStore from '../../../../../store/CategoryStore/CategoryStore';
import { useCallback, useEffect, useState } from 'react';
import { useStoreContext } from './../../../../../store/RootStore/context/rootStoreContext';
import { Option } from 'App/pages/components/MultiDropdown/MultiDropdown';
import FiterValueStore from './../../../../../store/FilterValueStore/FilterValueStore';
import qs from 'qs';

const SearchByFilter = observer(() => {
    console.log('i render or rerender')

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryStore = useLocalStore(() => new CategoryStore());
    const filterValueStore = useLocalStore(() => new FiterValueStore({ valueDefault: [] }))

    const queryStore = useStoreContext();

    useEffect(() => {
        categoryStore.getCategories();


        const parsedParams = qs.parse(searchParams.toString(), { decode: true });
       // console.log('parsedParams.filters.productCategory.id.$in', parsedParams.filters.productCategory.id.$in);
        if (parsedParams.filters?.productCategory) {
            const selectedCategoryId = parsedParams.filters.productCategory.id.$in;
            console.log('selectedCategoryId',selectedCategoryId)
            filterValueStore.setValue(parsedParams.filters.productCategory.id.$in)
        }




    }, [categoryStore, filterValueStore, searchParams]);

    const getOptionsFromcategories = (categories: ProductCategory[]) => {
        return categories.map((item: ProductCategory) => {
            return { key: item.id, value: item.title }
        })
    }

    // const handleChange = () => {
    // }
    // const getTitle = () => {
    //     return ''
    // }

    const handleChoise = useCallback((categoryId: number) => {
        const newFilter = {
            productCategory: {
                id: {
                    $eq: categoryId,
                }
            }
        };
        queryStore.query.setPage(1);
        queryStore.query.setFilters({
            ...queryStore.query.filters,
            ...newFilter,
        });
        queryStore.query.updateUrl((queryString: string) => {
            setSearchParams(queryString);
        });
    }, [queryStore, setSearchParams]);


    //const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const handleOnChange = useCallback((value: Option[]) => {
        console.log('i want to add newValue value', value)
        //const newValue = [...value]
        filterValueStore.setValue(value); // Обновляем состояние выбранных опций

        const createProductCategotyObj = () => {
            const result: string[] = [];
            value.map((item) => result.push(item.key.toString()))
            return result;
        }

        const newFilter = {
            productCategory: {
                id: {
                    // $eq: categoryId,
                    $in: createProductCategotyObj(),
                }
            }
        };
        queryStore.query.setPage(1);
        queryStore.query.setFilters({
            ...queryStore.query.filters,
            ...newFilter,
        });
        queryStore.query.updateUrl((queryString: string) => {
            setSearchParams(queryString);
        });


    }, [filterValueStore, queryStore.query, setSearchParams]);

    const getTitle = useCallback((): string => { //value: Option[]
        if (filterValueStore.value.length === 0) {
            return "Select options";         }
        return filterValueStore.value.map((option) => option.value).join(", "); // Список выбранных значений через запятую
    }, [filterValueStore.value]);

    return (
        <MultiDropdown
            options={getOptionsFromcategories(categoryStore.items)}
            value={filterValueStore.value}
            onChange={handleOnChange}
            getTitle={getTitle}
            className={styles['container__filter']}
        //onChoice={handleChoise}
        />
    )
}
);

export default SearchByFilter;