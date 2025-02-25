import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { checkTokenGuard } from './core/guard/checkToken/check-token.guard';
import { authGuard } from './core/guard/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
        title: 'home',
      },
      {
        path: 'error404',
        loadComponent: () =>
          import('./features/pages/not-found/not-found.component').then(
            (c) => c.NotFoundComponent
          ),
        title: 'error404',
      },
      {
        path: 'productDetails/:id',
        loadComponent: () =>
          import(
            './features/pages/product-details/product-details.component'
          ).then((c) => c.ProductDetailsComponent),
        title: 'productDetails',
      },
      {
        path: 'cart',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/pages/cart/cart.component').then(
            (c) => c.CartComponent
          ),
        title: 'cart',
      },
      {
        path: 'allorders',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/pages/all-orders/all-orders.component').then(
            (c) => c.AllOrdersComponent
          ),
        title: 'allorders',
      },
      {
        path: 'checkout/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/pages/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
        title: 'checkout',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/pages/product/product.component').then(
            (c) => c.ProductComponent
          ),
        title: 'products',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'brands',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'categories',
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [checkTokenGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'login',
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'signup',
      },
      {
        path: 'resetPassword',
        loadComponent: () =>
          import(
            './features/auth/reset-password/reset-password.component'
          ).then((c) => c.ResetPasswordComponent),
        title: 'resetPassword',
      },
      { path: '**', redirectTo: 'error404', pathMatch: 'full' },
    ],
  },
];
