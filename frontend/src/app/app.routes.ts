import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentFailureComponent } from './components/payment-failure/payment-failure.component';
import { PaymentPendingComponent } from './components/payment-pending/payment-pending.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: ProductListComponent },
  { path: 'producto/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  
  // MercadoPago return pages
  { path: 'pago/exito', component: PaymentSuccessComponent },
  { path: 'pago/fallo', component: PaymentFailureComponent },
  { path: 'pago/pendiente', component: PaymentPendingComponent },
  
  { path: '**', redirectTo: '' }
];
