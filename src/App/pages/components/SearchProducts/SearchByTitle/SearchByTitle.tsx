import Input from "App/pages/components/Input/Input";
import Button from "components/Button/Button";
import styles from './SearchByTitle.module.scss';
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";
import qs from "qs";
import { observer, useLocalStore } from "mobx-react-lite";
import { useStoreContext } from "App/App";
import SearchValueStore from './../../../../../store/SearchValueStore/SearchValueStore';

const SearchByTitle = observer(() => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryStore = useStoreContext();
    const valueStore = useLocalStore(() => new SearchValueStore({ valueDefault: '' }))

    useEffect(() => {
        const parsedParams = qs.parse(searchParams.toString(), { decode: true });
        if (parsedParams.filters?.title) {
            valueStore.setValue(parsedParams.filters.title.$containsi)
        }
    }, [searchParams, valueStore]);

    const handleInputChange = (searchQuery: string) => {
        valueStore.setValue(searchQuery);
    };

    const handleSearch = useCallback(() => {
        const newFilter = {
            title: {
                $containsi: valueStore.value,
            },
        };
        queryStore.query.setPage(1);
        queryStore.query.setFilters({
            ...queryStore.query.filters,
            ...newFilter,
        });
        queryStore.query.updateUrl((queryString: string) => {
            setSearchParams(queryString);
        });
    }, [queryStore.query, setSearchParams, valueStore.value]
    )

    return (
        <div className={styles['container__search']}>
            <Input placeholder="Search product" onChange={handleInputChange} value={valueStore.value} className={styles['container__search--grow']} />
            <Button onClick={handleSearch}>Find now</Button>
        </div>
    )
}
);

export default SearchByTitle;