export interface Transaction{
    TransactionID: number;
    SaleID: number;
    CustomerID: number | null;
    TransactionDate: string;
    PaymentMethod: string;
    TotalAmount: number;
    CashReceived: number;
    ChangeGiven: number;
    CheckNumber: number;
    CreditNumber: number;
    ExpiryDate: string;
}