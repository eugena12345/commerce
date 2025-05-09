import { ProductCategory } from 'App/pages/CatalogPage/type';
import MultiDropdown from "App/pages/components/MultiDropdown/MultiDropdown";
import styles from './SearchByFilter.module.scss';
import { useSearchParams } from 'react-router';
import { observer, useLocalStore } from 'mobx-react-lite';
import CategoryStore from 'store/CategoryStore';
import { useCallback, useEffect } from 'react';
import { Option } from 'App/pages/components/MultiDropdown/MultiDropdown';
import FiterValueStore from 'store/FilterValueStore';
import qs from 'qs';

const SearchByFilter = observer(() => {

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryStore = useLocalStore(() => new CategoryStore());
    const filterValueStore = useLocalStore(() => new FiterValueStore({ valueDefault: [] }))

    useEffect(() => {

        const loadCategory = async () => {
            await categoryStore.getCategories();
            const categories = categoryStore.items;
            const parsedParams = qs.parse(searchParams.toString());
            if (parsedParams.filterByCategoryId) {
                const categoryIdString = parsedParams.filterByCategoryId as string;
                const categoryIdColl = categoryIdString.split(',');
                const option: Option[] = categoryIdColl.map((id: string) => {
                    const category = categories.find((item) => item.id === Number(id));
                    if (category) {
                        return { key: id, value: category.title };
                    }
                    return null;
                })
                    .filter((element) => element !== null);
                filterValueStore.setValue(option);
            } else {
                filterValueStore.setValue([]);
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
            className={styles['container__filter']}
        />
    )
}
);

export default SearchByFilter;