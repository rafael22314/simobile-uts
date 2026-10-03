export interface Product {
    id: number;
    name: string;
    category: string;
    buyPrice: number;
    sellPrice: number;
    stock: number;
    imageUrl?: string;
    soldCount: number;
}
export interface CartItem {
    product: Product;
    qty: number;
    subtotal: number;
}
export interface Transaction {
    id: string;
    date: Date;
    items: CartItem[];
    totalAmount: number;
    totalProfit: number;
}