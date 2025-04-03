import styles from './Pagination.module.scss';
import arrowBackIcon from 'assets/images/arrow-right.svg'
import arrowForwardIcon from 'assets/images/arrow-rightSingle.svg'

interface PaginationProps {
    pageCount: number;
    actualPage: number;
    onClick: (newActualPage?: number) => void
}

const getNumberCountArr = (pageCount: number): number[] => {
    const result = [];
    for (let i = 1; i <= pageCount; i += 1) {
        result.push(i);
    }

    return result

}

const Pagination = ({ pageCount, actualPage, onClick }: PaginationProps) => {
    const numberCountArr = getNumberCountArr(pageCount);
    const handleClick = (newActualPage: number) => onClick(newActualPage);
    console.log('pageCount', pageCount);
    return (
        <div className={styles.pagination}>
            <div className={styles['pagination__arrow']}
                onClick={() => handleClick(actualPage > 1 ? actualPage - 1 : 1)}
            //disabled={actualPage === 1}
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