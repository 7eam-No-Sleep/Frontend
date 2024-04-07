export interface Shift {
    shift_id: number;
    employee_id: number;
    shift_time: number;
    shift_date: string;
    total_transactions: number;
    total_cash: number | null;
    total_checks: number | null;
    total_card_sales: number | null;
    total_sales: number | null;
  }