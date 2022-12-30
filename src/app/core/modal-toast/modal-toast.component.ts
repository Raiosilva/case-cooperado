import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ComponentRef, Injectable, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';


export const popup = trigger('popup', [
  state(
    '*',
    style({
      opacity: 1,
      transform: 'perspective(500px) translate(0px)',
    })
  ),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'perspective(500px) translate(-100px)'
    }),
    animate('0.2s ease'),
  ]),
  transition(':leave', [
    animate(
      '0.2s ease',
      style({
        opacity: 0,
        transform: 'perspective(500px) translate(-400px)'
      })
    )
  ])
])

@Component({
  selector: 'app-modal-toast',
  templateUrl: './modal-toast.component.html',
  styleUrls: ['./modal-toast.component.scss'],
  animations: [popup]
})
export class ModalToastComponent implements OnInit {
  public childComponentType!: Type<any>;
  public onClose$: Subject<boolean> = new Subject();

  @ViewChild('notificationTemplate', { read: ViewContainerRef, static: true })
  public notificationTemplate!: ViewContainerRef;

  public ngOnInit(): void {
    if (this.childComponentType)
      this.notificationTemplate.createComponent(this.childComponentType);
  }

  onClose() {
    this.onClose$.next(true);
  }
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  public notificationModalComponentRef!: ComponentRef<ModalToastComponent>;
  public containerElementViewRef!: ViewContainerRef;

  public newNotification(componentType: Type<any>) {
    if (this.notificationModalComponentRef) {
      this.closeNotification();
      this.notificationModalComponentRef.instance.onClose$.next(true);
    }

    this.openNotification(componentType);

    this.notificationModalComponentRef.instance.onClose$.subscribe(() =>
      this.closeNotification()
    );
  }

  private openNotification(componentType: Type<any>) {
    this.notificationModalComponentRef =
      this.containerElementViewRef.createComponent(ModalToastComponent);

    this.notificationModalComponentRef.instance.childComponentType = componentType;
  }

  public closeNotification() {
    this.notificationModalComponentRef.destroy();
  }
}