import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, fromEvent, of, switchMap, tap } from 'rxjs';
import { ToastService } from 'src/app/core/modal-toast/modal-toast.component';
import { NotificationComponent } from 'src/app/core/notification/notification.component';
import { CpfValidator } from 'src/app/core/validators/validators';
import { CustomerService } from '../service/customer.service';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  // standalone: true,
  // imports: [NgxMaskDirective],

})
export class CustomerFormComponent implements OnInit {
  @ViewChild('container', { static: true, read: ViewContainerRef })  
  public container!: ViewContainerRef;
  @ViewChild('searchBy') el!: ElementRef;

  public searchCustomerByCpf!: FormGroup;
  public customer$!: Observable<any>;
  public loading = false;


  constructor(
    private fb: FormBuilder,
    private service: CustomerService,
    private toastService: ToastService,
    public viewRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.createForm();
    this.toastService.containerElementViewRef = this.viewRef;
  }

  // TODO: 
  private searchCustomer() {
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup');

    const keyupObservable$ = keyup$
      .pipe(
        filter(Boolean),
        tap(() => this.loading = true),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((data) => {
          if (data)
            this.loading = false;
          }
        ),
        switchMap(
          () => this.service.getCustomer(this.searchCustomerByCpf.controls['cpf'].value)
        ),
        this.handleError(Error)
      )

    this.customer$ = keyupObservable$;
  }

  createForm() {
    this.searchCustomerByCpf = this.fb.group({
      cpf: ['', [Validators.required, CpfValidator.validate, Validators.maxLength(11)]]
    });
  }

  onSubmit() {
    this.loading = true;

    setTimeout(() => {
      if(this.searchCustomerByCpf.controls['cpf'].value.length === 11) {
        this.customer$ =
        this.service.getCustomer(
          this.searchCustomerByCpf.controls['cpf'].value
        )
        .pipe(
          debounceTime(1000),
            tap((data) => {
                if (data) {
                  this.service.setCustomerObservable(data);
                  this.loading = false;
                }
              }
            ),
            filter(Boolean),
            distinctUntilChanged(),
            this.handleError(Error)
          )
      }
    }, 2000);
  }

  private handleError(error: any) {
    return catchError(error => {
      if (error.message === '404') {
        this.messageError(error);
        this.loading = false;
      }
      return of()
    })
  }

  private messageError = (err: {message: string}) => {
    console.log(`${err.message} Customer not found or not exist!`)
    if (err.message === '404') {
      this.service.setNotificationCustomerNotFound('404');
      this.service.setCustomerObservable(undefined);
      this.notify();
    }
  }

  public onReset() {
    this.customer$ = of();
    // this.searchCustomerByCpf.reset();
  }

  notify(): void {
    setTimeout(() => {
      this.toastService.newNotification(NotificationComponent);
    }, 1000);

    setTimeout(() => {
      this.toastService.closeNotification();
    }, 5000);
  }
}
