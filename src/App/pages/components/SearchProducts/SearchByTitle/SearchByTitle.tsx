import Input from "App/pages/components/Input/Input";
import Button from "components/Button/Button";
import styles from './SearchByTitle.module.scss';
import { ParamsFromQuery } from '../../../../../store/CatalogStore/types';
import QueryStore from '../../../../../store/QueryStore/QueryStore';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import qs from "qs";
import { observer } from "mobx-react-lite";


interface SearchProductsProps {
    callbackOnFilter: (params: ParamsFromQuery) => void;
    queryStore: QueryStore
}

const SearchByTitle = observer(({callbackOnFilter, queryStore}:SearchProductsProps ) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

        useEffect(() => {
    
            const parsedParams = qs.parse(searchParams.toString(), { decode: true });
            if (parsedParams.filters?.title) {
                setSearchQuery(parsedParams.filters.title.$containsi)
            } 
        }, [searchParams]);


    const handleInputChange = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };

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


    return (
        <div className={styles['container__search']}>
            <Input placeholder="Search product" onChange={handleInputChange} value={searchQuery} className={styles['container__search--grow']} />
            <Button onClick={handleSearch}>Find now</Button>
        </div>

    )
}
);


export default SearchByTitle;