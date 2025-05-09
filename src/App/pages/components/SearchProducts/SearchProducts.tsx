import styles from './SearchProducts.module.scss';
import Text from "components/Text/Text";
import { observer } from 'mobx-react-lite';
import SearchByTitle from './SearchByTitle/SearchByTitle';
import SearchByFilter from './SearchByFilter/SearchByFilter';
import { useSearchParams } from 'react-router';
import Button from 'components/Button/Button';
import { Meta } from 'store/CatalogStore/CatalogStore';
import Sort from './Sort';

interface SearchProductsProps {
    totalItems: number;
    metaLoading: Meta;
}

const SearchProducts = observer((
    { totalItems, metaLoading }: SearchProductsProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const resetFilter = () => {
        searchParams.set('filterByCategoryId', '');
        searchParams.set('filterByTitle', '');
        searchParams.set('sort', '');
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    }

    return (
        <div className={styles.container}>
            <SearchByTitle />
            <div className={styles.filterandsort}>
            <SearchByFilter />
            <Sort/>
            </div>
            <div className={styles.container__resultOrReset}>
                <div className={styles['container__result']}>
                    {metaLoading === Meta.success && totalItems >= 0 &&
                        <>
                            <Text tag='h2' color='primary'>Total products</Text>
                            <Text view='p-20' color='accent' weight='bold'>{totalItems}</Text>
                        </>
                    }
                </div>
                <Button onClick={resetFilter}>Reset filter</Button>
            </div>
        </div>
    );
}
);

export default SearchProducts;