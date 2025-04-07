import styles from './SearchProducts.module.scss';
import Text from "components/Text/Text";
import { observer } from 'mobx-react-lite';
import SearchByTitle from './SearchByTitle/SearchByTitle';
import SearchByFilter from './SearchByFilter/SearchByFilter';
import { useSearchParams } from 'react-router';
import Button from 'components/Button/Button';

interface SearchProductsProps {
    totalItems: number;
}

const SearchProducts = observer((
    {totalItems}: SearchProductsProps) => {
        const [searchParams, setSearchParams] = useSearchParams();
 const resetFilter = (): void => {
        searchParams.set('filterByCategoryId', '');
        searchParams.set('filterByTitle', '');
        searchParams.set('page', '1')
        setSearchParams(searchParams);
    }

    return (
        <div className={styles.container}>
            <SearchByTitle/>
            <SearchByFilter/>
            <div className={styles.container__resultOrReset}>
                <div className={styles['container__result']}>
                <Text tag='h2' color='primary'>Total products</Text>
                <Text view='p-20' color='accent' weight='bold'>{totalItems}</Text>
                </div>
                <Button onClick={resetFilter} >Reset filter</Button>
            </div>
        </div>
    );
}
);

export default SearchProducts;