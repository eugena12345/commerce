import Button from "components/Button";
import Text from 'components/Text';
import { useEffect, useState } from "react";
import paymentStore from "store/PaymentStore";
import styles from './PaymentPage.module.scss';
import cartStore from "store/CartStore";
import { useNavigate } from "react-router";
import { routes } from "config/routes.config";
import { observer } from "mobx-react-lite";
import { reaction } from "mobx";

const PaymentPage: React.FC = observer(() => {
    const [loading, setLoading] = useState<boolean>(false);
    const [cardNumber, setCardNumber] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [cvc, setCvc] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const disposeReaction = reaction(
            () => paymentStore.paymentStatus,
            (status) => {
                if (status === 'success') {
                    setTimeout(() => {
                        cartStore.removeAllProducts();
                        navigate(routes.products.create());
                        paymentStore.setPaymentStatus(null)
                    }, 3000);
                }
            }
        );

        return () => disposeReaction();

    }, [navigate]);

    const handlePayment = async () => {
        setLoading(true);
        paymentStore.setPaymentStatus('pending');

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const isSuccess = Math.random() > 0.2;

            if (isSuccess) {
                paymentStore.setPaymentStatus('success');
            } else {
                paymentStore.setPaymentStatus('failed');
            }
        } catch (error) {
            console.error(error);
            paymentStore.setPaymentStatus('failed');
        } finally {
            setLoading(false);
        }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.match(/.{1,4}/g)?.join(' ') || '';
        setCardNumber(value);
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 6);
        }
        setExpiryDate(value);
    };

    const checkIfNeedDisable = () => {
        if (loading) {
            return true;
        }
        if (cardNumber.length < 19 || expiryDate.length < 7 || cvc.length < 3) {
            return true;
        }
    }

    return (
        <div className={styles.container}>
            {cartStore.totalPrice ?
                <>
                    <Text tag='h3'>Total price: ${cartStore.totalPrice}</Text>
                    <div className={styles.card}>
                        <div className={styles['card-header']}>
                            <span className={styles['card-logo']}>Bank</span>
                            <span className={styles['card-type']}>Visa</span>
                        </div>
                        <div className={styles['card-body']}>
                            <div className={styles['card-number']}>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                />
                            </div>
                            <div className={styles['card-details']}>
                                <div className={styles['card-expiry']}>
                                    <label htmlFor="expiryDate">Validity period</label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        placeholder="MM/YYYY"
                                        maxLength={7}
                                        value={expiryDate}
                                        onChange={handleExpiryDateChange}
                                    />
                                </div>
                                <div className={styles['card-cvc']}>
                                    <label htmlFor="cvc">CVC</label>
                                    <input
                                        type="text"
                                        id="cvc"
                                        placeholder="000"
                                        maxLength={3}
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button onClick={handlePayment} disabled={checkIfNeedDisable()} loading={loading}>
                        Pay
                    </Button>

                    {paymentStore.paymentStatus === 'pending' && <p>Payment in progress...</p>}
                    {paymentStore.paymentStatus === 'success' && <p>Payment successful!</p>}
                    {paymentStore.paymentStatus === 'failed' && <p>Payment error.</p>}
                </>
                : <>There is no orders. Add items to your cart</>
            }
        </div >



    );
});


export default PaymentPage;