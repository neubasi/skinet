import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';


@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalsComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [NgbModule, PagingHeaderComponent, PagerComponent, OrderTotalsComponent]
})
export class SharedModule { }
