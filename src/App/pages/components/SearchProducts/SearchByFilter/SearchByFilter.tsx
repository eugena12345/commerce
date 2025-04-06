import { ProductCategory } from 'App/pages/CatalogPage/type';
import MultiDropdown from "App/pages/components/MultiDropdown/MultiDropdown";
import styles from './SearchByFilter.module.scss';
import { useSearchParams } from 'react-router';
import { observer, useLocalStore } from 'mobx-react-lite';
import CategoryStore from '../../../../../store/CategoryStore/CategoryStore';
import { useCallback, useEffect } from 'react';
import { useStoreContext } from 'App/App';

const SearchByFilter = observer(() => {

    const [, setSearchParams] = useSearchParams();
    const categoryStore = useLocalStore(() => new CategoryStore());
    const queryStore = useStoreContext();

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
        queryStore.query.setPage(1);
        queryStore.query.setFilters({
            ...queryStore.query.filters,
            ...newFilter,
        });
        queryStore.query.updateUrl((queryString: string) => {
            setSearchParams(queryString);
        });
    }, [queryStore, setSearchParams]);

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