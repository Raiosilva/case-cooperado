import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CpfValidator } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  // standalone: true,
  // imports: [NgxMaskDirective],

})
export class CustomerFormComponent {
  public searchCustomerByCpf!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  createForm() {
    this.searchCustomerByCpf = this.fb.group({
      cpf: ['', [Validators.required, CpfValidator.validate, Validators.maxLength(11)]]
    });
  }

  onSubmit() {
    console.log(this.searchCustomerByCpf.controls['cpf']);
  }
}
