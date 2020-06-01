import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';


const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: 'test-error', component: TestErrorComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule)},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule)},
  {path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
