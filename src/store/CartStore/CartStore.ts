import { action, computed, makeObservable, observable } from "mobx";

export interface CartItem {
    id: number,
    title: string,
    price: number,
    quantity: number,
    documentId: string,

}

type PrivateFields = '_items';

class CartStore {
    private _items: CartItem[] = [];

    constructor() {
        makeObservable<CartStore, PrivateFields>(this, {
            _items: observable,
            items: computed,
            addProduct: action,
            removeProduct: action,
            getItemsFromStorage: action,
            removeAllProducts: action
        })
    };

    get items() {
        return this._items;
    };

    get totalPrice() {
        return this._items.reduce((acc, item) => { return (acc + (item.price * item.quantity)) }, 0)
    }

    get totalItems() {
        return this._items.reduce((acc, item) => { return (acc + (item.quantity)) }, 0)
    }

    setItems() {
        sessionStorage.setItem('cart', JSON.stringify(this._items));
    }

    getItemsFromStorage() {
        const itemsInCartString = sessionStorage.getItem('cart');
        if (itemsInCartString) {
            this._items = JSON.parse(itemsInCartString);
        }
    }

    addProduct(product: CartItem) {
        const exsistingProduct = this._items.find((item) => item.id === product.id);
        if (exsistingProduct) {
            exsistingProduct.quantity += 1;
        } else {
            this._items.push(product);
        }
        this.setItems();
    }

    subtractUnit(id: number) {
        const exsistingProduct = this._items.find((item) => item.id === id);
        exsistingProduct!.quantity -= 1;
        if (exsistingProduct?.quantity === 0) {
            this.removeProduct(id);
        }
        this.setItems();
    }

    removeProduct(id: number) {
        this._items = this.items.filter((item) => item.id !== id);
        this.setItems();
    }

    removeAllProducts() {
        this._items = [];
        this.setItems();
    }

}

const cartStore = new CartStore();

export default cartStore;