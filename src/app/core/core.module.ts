import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalToastComponent } from './modal-toast/modal-toast.component';
import { NotificationComponent } from './notification/notification.component';
import { PageMasterComponent } from './page-master/page-master.component';
import { SearchLoadComponent } from './search-load/search-load.component';
import { CpfValidatorDirective } from './validators/cpf-validator.directive';

@NgModule({
  declarations: [
    PageMasterComponent,
    CpfValidatorDirective,
    SearchLoadComponent,
    ModalToastComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageMasterComponent,
    CpfValidatorDirective,
    SearchLoadComponent,
    ModalToastComponent,
    NotificationComponent
  ]
})
export class CoreModule { }
