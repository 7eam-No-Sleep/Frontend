import { Routes } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { HeaderComponent } from './header/header.component';
import { ViewInventoryComponent } from './view-inventory/view-inventory.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [
    {path: '', component: SalesComponent},
    {path: 'header', component: HeaderComponent},
    {path: 'sales', component: SalesComponent},
    {path: 'viewinventory', component: ViewInventoryComponent},
    {path: 'viewcustomers', component: ViewCustomersComponent},
    {path: 'addproduct', component: AddProductComponent},
    {path: 'addcustomer', component: AddCustomerComponent},
    {path: 'transactionhistory', component: TransactionHistoryComponent},
    {path: 'reports', component: ReportsComponent}
];
