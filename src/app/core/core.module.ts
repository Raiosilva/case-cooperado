import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageMasterComponent } from './page-master/page-master.component';
import { CpfValidatorDirective } from './validators/cpf-validator.directive';

@NgModule({
  declarations: [
    PageMasterComponent,
    CpfValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageMasterComponent,
    CpfValidatorDirective
  ]
})
export class CoreModule { }
