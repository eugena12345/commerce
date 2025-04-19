import ItemCart from 'App/pages/CartPage/ItemCart';
import styles from './CartPage.module.scss';
import Text from 'components/Text';
import { observer } from 'mobx-react-lite';
import cartStore from 'store/CartStore/CartStore';
import TableHeader from 'App/pages/CartPage/ItemCart/TableHeader/TableHeader';


const CartPage = observer(() => {

    return (
        <div className={styles.container}>
            <div className={styles['container--withmax']}>
                <Text tag="h1" color="accent">Cart</Text>
                {cartStore.items.length === 0 &&
                    <Text tag='h2'>There is no added stuff</Text>}
                {cartStore.items.length > 0 &&
                    <div className={styles['container__table']}>
                        <TableHeader />
                        {cartStore.items.map((item) => <ItemCart item={item} />)}
                        <Text tag="h2" color="accent">Total: {cartStore.totalPrice}</Text>
                    </div>
                }
            </div>
        </div>
    )
});

export default CartPage;