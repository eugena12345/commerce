import styles from './SearchProducts.module.scss';
import Text from "components/Text/Text";
import { observer } from 'mobx-react-lite';
import SearchByTitle from './SearchByTitle/SearchByTitle';
import SearchByFilter from './SearchByFilter/SearchByFilter';

interface SearchProductsProps {
    totalItems: number;
}

const SearchProducts = observer((
    {totalItems}: SearchProductsProps) => {
    return (
        <div className={styles.container}>
            <SearchByTitle/>
            <SearchByFilter/>
            <div className={styles['container__result']}>
                <Text tag='h2' color='primary'>Total products</Text>
                <Text view='p-20' color='accent' weight='bold'>{totalItems}</Text>
            </div>
        </div>
    );
}
);

export default SearchProducts;