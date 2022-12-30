import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/resource/customer/service/customer.service';

@Component({
  selector: 'app-page-master',
  templateUrl: './page-master.component.html',
  styleUrls: ['./page-master.component.scss']
})
export class PageMasterComponent {
  public customer$!: Observable<any>;

  constructor(private customerService: CustomerService) {
    this.customer$ = this.customerService.getCustomerObservable();
  }

  public showMenu() {
    console.log('click');
  }
}
