import { Component } from "@angular/core";
import { CustomerService } from "src/app/resource/customer/service/customer.service";

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styles: [`
        div {
            padding: 0 1rem;
            background-color: #195C7A;
            color: #FFFF;
            border-radius: 4px;
        }
    `]
})

export class NotificationComponent {
    public error404 = {
        title: 'Not found',
        text: 'Customer not found or not exist!'
    };

    constructor(private service: CustomerService) {
        this.verificationErrorType();
    }

    private verificationErrorType(): void {
        this.service.getNotificationCustomerNotFound()
            .subscribe((v) => {
                // TODO: Verification type error and include code...
                // if (v === '404')
            });
    }
}