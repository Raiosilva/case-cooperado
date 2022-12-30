import { Injectable } from '@angular/core';
import { Observable, Subject, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public customerObservable$: Subject<any> = new Subject<any>;
  public notificationCustomerNotFound$: Subject<any> = new Subject<any>;
  public mockCustomer = {
    "name": "Mariane de sousa Oliveira",
    "situationCPF": "Regular",
    "label": "Situação cadastral do CPF",
    "localeConsultation": "Receita Federal",
    "cpf": "65197984872",
    "account": [
        {
          "labelAccount": "Conta aplicação",
          "localeConsultation": "Cooperativa Viacredi",
          "labelNumber": "Número da conta",
          "numberAccount": "557932-4"
        },
        {
          "labelAccount": "Conta corrente",
          "localeConsultation": "Cooperativa Viacredi",
          "labelNumber": "Número da conta",
          "numberAccount": "778461-8"
        }
    ]
  }

  constructor() { }

  public setCustomerObservable(value: any) {
    this.customerObservable$.next(value)
  }

  public getCustomerObservable(): Observable<any> {
    return this.customerObservable$.asObservable();
  }

  public setNotificationCustomerNotFound(value: any) {
    this.notificationCustomerNotFound$.next(value)
  }

  public getNotificationCustomerNotFound(): Observable<any> {
    return this.notificationCustomerNotFound$.asObservable();
  }

  public getCustomer(searchCustomerByCpf: string): Observable<any> {
    const error = {
      typeError: '404',
      message: 'Customer not found or not exist!'
    };
    const errorObservable = throwError(() => new Error(error.typeError));

    if (searchCustomerByCpf === this.mockCustomer.cpf)
      return of(this.mockCustomer)

    return errorObservable;
  }
}
