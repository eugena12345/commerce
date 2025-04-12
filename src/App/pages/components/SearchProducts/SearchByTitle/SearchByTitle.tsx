import Input from 'pages/components/Input';
import Button from "components/Button/Button";
import styles from './SearchByTitle.module.scss';
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";
import qs from "qs";
import { observer, useLocalStore } from "mobx-react-lite";
import SearchValueStore from 'store/SearchValueStore';
import React from 'react';

const SearchByTitle = observer(() => {
    const [searchParams, setSearchParams] = useSearchParams();
    const valueStore = useLocalStore(() => new SearchValueStore({ valueDefault: '' }))
    useEffect(() => {
        const parsedParams = qs.parse(searchParams.toString(), { decode: true });
        if (parsedParams.filterByTitle) {
            valueStore.setValue(parsedParams.filterByTitle as string)
        }
    }, [searchParams, valueStore]);

    const handleInputChange = (searchQuery: string) => {
        valueStore.setValue(searchQuery);
    };

    const handleSearch = useCallback(() => {
        searchParams.set('page', '1');
        searchParams.set('filterByTitle', `${valueStore.value}`);
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams, valueStore.value]  
    )

    return (
        <div className={styles.containerSearch}>
            <Input 
            placeholder="Search product" 
            onChange={handleInputChange} 
            value={valueStore.value} 
            className={styles.containerSearchGrow}
            />
            <Button onClick={handleSearch}>Find now</Button>
        </div>
    )
}
);

export default SearchByTitle;