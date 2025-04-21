import { observer } from 'mobx-react-lite';
import styles from './ItemCart.module.scss';
import { CartItem } from 'store/CartStore/CartStore';
import cartStore from 'store/CartStore/CartStore';
import { useNavigate } from 'react-router';
import { routes } from 'config/routes.config';

type ItemCartProps = {
    item: CartItem
}

const ItemCart: React.FC<ItemCartProps> = observer(({ item }) => {
    const navigate = useNavigate();
    const showProductPage = (documentId: string) => {
        navigate(routes.product.create(documentId));
    };
    return (
        <div className={styles.container}>
            <div className={styles['container__title']} onClick={() => showProductPage(item.documentId)}>{item.title}</div>
            <div className={styles['container__quantity']}>
                <button className={styles.minus} onClick={() => cartStore.subtractUnit(item.id)}>-</button>
                {item.quantity}
                <button className={styles.plus} onClick={() => cartStore.addProduct(item)}>+</button>
            </div>
            <div className={styles['container__price']}>{item.price}</div>
            <div className={styles['container__total']}>{item.quantity * item.price}</div>
            <button onClick={() => cartStore.removeProduct(item.id)}>&#128465;</button>
        </div>
    )
});

export default ItemCart;