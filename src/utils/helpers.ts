import { ProductType } from 'App/pages/CatalogPage/type';
import cartStore from "store/CartStore";


export const getNumberCountArr = (pageCount: number): number[] => {
    const result = [];
    for (let i = 1; i <= pageCount; i += 1) {
        result.push(i);
    }
    return result
}

export const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<Element, MouseEvent>, item: ProductType) => {
    e.stopPropagation();
    const itemInCart = {
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        price: item.price,
        quantity: 1
    }
    cartStore.addProduct(itemInCart);
}