import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from '../notification/notification.component';
import { ModalToastComponent, ToastService } from './modal-toast.component';

describe('ModalToastComponent', () => {
  let component: ModalToastComponent;
  let fixture: ComponentFixture<ModalToastComponent>;
  let viewContainerRef: ViewContainerRef;
  
  beforeEach(async () => {
    const viewContainerRefSpy = jasmine.createSpyObj('ViewContainerRef', ['insert'], {'injector': TestBed});
    await TestBed.configureTestingModule({
      declarations: [ ModalToastComponent, NotificationComponent ],
      providers: [
        { provide: ViewContainerRef, useValue: viewContainerRefSpy },
        ToastService
      ],
      imports: [
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalToastComponent);
    component = fixture.componentInstance;
    viewContainerRef = TestBed.inject(ViewContainerRef);
    component.notificationTemplate.createComponent(NotificationComponent)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


@Component({
  template: '<ng-template fooHost></ng-template>',
})
class TestHostComponent {
  @ViewChild(NotificationComponent, { static: true }) notificationComponent!: NotificationComponent;
}