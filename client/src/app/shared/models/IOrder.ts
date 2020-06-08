import { IAdress } from './IAdress';

export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAdress;
}

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: Date;
    shipToAddress: IAdress;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: IOrderItem[];
    subtotal: number;
    total: number;
    status: string;
}

export interface IOrderItem {
    productId: number;
    productName: string;
    price: number;
    pictureUrl: string;
    quantity: number;
}

