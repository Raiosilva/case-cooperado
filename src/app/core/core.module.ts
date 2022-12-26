import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageMasterComponent } from './page-master/page-master.component';

@NgModule({
  declarations: [
    PageMasterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageMasterComponent
  ]
})
export class CoreModule { }
