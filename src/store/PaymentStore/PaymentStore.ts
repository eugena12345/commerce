import { action, makeObservable, observable } from 'mobx';

class PaymentStore {
    paymentStatus: 'pending' | 'success' | 'failed' | null = null;

    constructor() {
        makeObservable(this, {
            paymentStatus: observable,
            setPaymentStatus: action,

        })

    }

    setPaymentStatus(status: 'pending' | 'success' | 'failed' | null) {
        this.paymentStatus = status;
    }
}

const paymentStore = new PaymentStore();
export default paymentStore;