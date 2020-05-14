import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastComponent } from './toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SectionHeaderComponent } from './section-header/section-header.component';




@NgModule({
  declarations: [NavBarComponent, TestErrorComponent, NotFoundComponent, ServerErrorComponent, ToastComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports:[
    NavBarComponent,
    SectionHeaderComponent
  ],
  bootstrap: [ToastComponent]
})
export class CoreModule { }
