export interface Transaction{
    TransactionID: number;
    SalesID: number;
    CustomerID: number;
    TransactionDate: Date;
    PaymentMethod: string;
    TotalAmount: number;
}