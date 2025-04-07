import styles from './Pagination.module.scss';
import arrowBackIcon from 'assets/images/arrow-right.svg'
import arrowForwardIcon from 'assets/images/arrow-rightSingle.svg'
import { useSearchParams } from 'react-router';
import { getNumberCountArr } from '../../../../utils/helpers';

interface PaginationProps {
    pageCount: number;
    actualPage: number;
}

const Pagination = ({ pageCount, actualPage }: PaginationProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const numberCountArr = getNumberCountArr(pageCount);
    const handleClick = (newActualPage: number) => {
        searchParams.set('page', `${newActualPage}`);
        setSearchParams(searchParams);
    };
    
    return (
        <div className={styles.pagination}>
            <div className={styles['pagination__arrow']}
                onClick={() => handleClick(actualPage > 1 ? actualPage - 1 : 1)}
            // todo: add disabled
            >
                <img src={arrowBackIcon} alt='back' />
            </div>
            {numberCountArr.map((item) => {

                return (<div className={`${styles.pagination__pagenumber} ${item === actualPage ? styles['pagination__pagenumber--active'] : ''
                    }`}
                    key={item}
                    onClick={() => handleClick(item)}
                >{item}</div>)
            }
            )}
            <div className={styles['pagination__arrow']}
                onClick={() => handleClick(actualPage < pageCount ? actualPage + 1 : pageCount)}

            >
                <img src={arrowForwardIcon} alt='forward' />
            </div>
        </div>
    )
}

export default Pagination;