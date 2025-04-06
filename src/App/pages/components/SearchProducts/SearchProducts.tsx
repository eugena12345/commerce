import styles from './SearchProducts.module.scss';
import Text from "components/Text/Text";
import { observer } from 'mobx-react-lite';
import QueryStore from '../../../../store/QueryStore/QueryStore';
import { ParamsFromQuery } from '../../../../store/CatalogStore/types';
import SearchByTitle from './SearchByTitle/SearchByTitle';
import SearchByFilter from './SearchByFilter/SearchByFilter';

interface SearchProductsProps {
    totalItems: number;
    callbackOnFilter: (params: ParamsFromQuery) => void;
    queryStore: QueryStore
}

const SearchProducts = observer((
    {totalItems, callbackOnFilter, queryStore}: SearchProductsProps) => {

    return (
        <div className={styles.container}>
            <SearchByTitle
                callbackOnFilter={callbackOnFilter}
                queryStore={queryStore}
            />

            <SearchByFilter
                callbackOnFilter={callbackOnFilter}
                queryStore={queryStore}
            />

            <div className={styles['container__result']}>
                <Text tag='h2' color='primary'>Total products</Text>
                <Text view='p-20' color='accent' weight='bold'>{totalItems}</Text>
            </div>

        </div>
    );
}
);

export default SearchProducts;