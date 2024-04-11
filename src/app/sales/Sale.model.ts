export interface Sale{
    SaleID: number;
    CustomerID: number | null;
    SaleDate: string;
    ItemsSold: number;
    TotalPrice: number;
    Discount: number;
    employee_id: number; 
}