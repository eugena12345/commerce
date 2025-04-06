import Input from "App/pages/components/Input/Input";
import Button from "components/Button/Button";
import styles from './SearchByTitle.module.scss';
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import qs from "qs";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "App/App";

const SearchByTitle = observer(() => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const queryStore = useStoreContext();

    useEffect(() => {
        const parsedParams = qs.parse(searchParams.toString(), { decode: true });
        if (parsedParams.filters?.title) {
            setSearchQuery(parsedParams.filters.title.$containsi)
        }
    }, [searchParams]);

    const handleInputChange = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };

    const handleSearch = useCallback(() => {
        const newFilter = {
            title: {
                $containsi: searchQuery,
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
    }, [queryStore, searchQuery, setSearchParams]
    )

    return (
        <div className={styles['container__search']}>
            <Input placeholder="Search product" onChange={handleInputChange} value={searchQuery} className={styles['container__search--grow']} />
            <Button onClick={handleSearch}>Find now</Button>
        </div>
    )
}
);

export default SearchByTitle;