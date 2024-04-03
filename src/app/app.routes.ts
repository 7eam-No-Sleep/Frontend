import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SalesComponent } from './sales/sales.component';
import { HeaderComponent } from './header/header.component';
import { ViewInventoryComponent } from './view-inventory/view-inventory.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ReportsComponent } from './reports/reports.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'header', component: HeaderComponent},
    { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
    { path: 'viewinventory', component: ViewInventoryComponent, canActivate: [AuthGuard] },
    { path: 'viewcustomers', component: ViewCustomersComponent, canActivate: [AuthGuard] },
    { path: 'addproduct', component: AddProductComponent, canActivate: [AuthGuard] },
    { path: 'addcustomer', component: AddCustomerComponent, canActivate: [AuthGuard] },
    { path: 'transactionhistory', component: TransactionHistoryComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
    { path: 'viewstaff', component: ViewStaffComponent, canActivate: [AuthGuard] }
    
];
