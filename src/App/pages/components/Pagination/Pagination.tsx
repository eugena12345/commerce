import styles from './Pagination.module.scss';
import arrowBackIcon from 'assets/images/arrow-right.svg'
import arrowForwardIcon from 'assets/images/arrow-rightSingle.svg'
import { useSearchParams } from 'react-router';
//import { ParamsFromQuery } from '../../../../store/CatalogStore/types';
import { getNumberCountArr } from '../../../../utils/helpers';
import { useCallback } from 'react';
import { useStoreContext } from 'App/App';

interface PaginationProps {
    pageCount: number;
    actualPage: number;
}

const Pagination = ({ pageCount, actualPage }: PaginationProps) => {
    const [, setSearchParams] = useSearchParams();
    const queryStore = useStoreContext();
    const numberCountArr = getNumberCountArr(pageCount);
    const handleClick = useCallback(async (newActualPage: number) => {
        queryStore.query.setPage(newActualPage);
        queryStore.query.updateUrl((queryString: string) => {
            setSearchParams(queryString);
        });
        //onClick(queryStore.query.getQueryParams());
    }, [queryStore, setSearchParams]
    );
    
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