import styles from './Pagination.module.scss';
import arrowBackIcon from 'assets/images/arrow-right.svg'
import arrowForwardIcon from 'assets/images/arrow-rightSingle.svg'


const Pagination = () => {
    const numberContArr = [1, 2, 3, 4, 5, 6];
    return (
        <div className={styles.pagination}>
            <div className={styles['pagination__arrow']}>
                <img src={arrowBackIcon} alt='back' />
            </div>
            {numberContArr.map((item) => <div className={styles['pagination__pagenumber']} key={item}>{item}</div>)}
            <div className={styles['pagination__arrow']}>
                <img src={arrowForwardIcon} alt='forward' />
            </div>
        </div>
    )
}

export default Pagination;