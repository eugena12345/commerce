import styles from './TableHeader.module.scss';

const TableHeader = () => {
    return (
        <div className={styles.container}>
            <div className={styles['container__title']}>Title</div>
            <div className={styles['container__quantity']}>Quantity</div>
            <div className={styles['container__price']}>Price</div>
            <div className={styles['container__total']}>Sum</div>
        </div>
    )
};

export default TableHeader;