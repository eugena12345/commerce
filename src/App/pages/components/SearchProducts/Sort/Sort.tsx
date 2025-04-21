import { useSearchParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import Text from 'components/Text';
import Button from 'components/Button';
import styles from './Sort.module.scss'

const Sort = observer(() => {

    const [searchParams, setSearchParams] = useSearchParams();
    const sortByRating = () => {
        searchParams.set('sort', 'rating:desc');
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    }

    const sortByPrice = () => {
        searchParams.set('sort', 'price:asc');
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    }


    return (
        <div className={styles.container}>
            <Text view='p-18'>Sort:</Text>
            <div className={styles['container__margin']}>
                <Button onClick={sortByRating}> by rating</Button>
            </div>
            <Button onClick={sortByPrice}> by price</Button>
        </div>
    )
}
);

export default Sort;