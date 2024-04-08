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
import { ViewShiftsComponent } from './view-shifts/view-shifts.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { HeaderManagerComponent } from './header-manager/header-manager.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'header', component: HeaderComponent, canActivate: [AuthGuard]},
    {path: 'managerheader', component: HeaderManagerComponent, canActivate: [AuthGuard]},
    { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
    { path: 'viewinventory', component: ViewInventoryComponent, canActivate: [AuthGuard] },
    { path: 'viewcustomers', component: ViewCustomersComponent, canActivate: [AuthGuard] },
    { path: 'addproduct', component: AddProductComponent, canActivate: [AuthGuard] },
    { path: 'addcustomer', component: AddCustomerComponent, canActivate: [AuthGuard] },
    { path: 'transactionhistory', component: TransactionHistoryComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
    { path: 'viewstaff', component: ViewStaffComponent, canActivate: [AuthGuard] },
    { path: 'viewshifts', component: ViewShiftsComponent, canActivate: [AuthGuard]},
    { path: 'addstaff', component: AddStaffComponent, canActivate: [AuthGuard]},
    { path: 'inventory/:id/edit', component: EditProductComponent, canActivate: [AuthGuard]},
    { path: 'customer/:id/edit', component: EditCustomerComponent, canActivate: [AuthGuard]}
    
];
