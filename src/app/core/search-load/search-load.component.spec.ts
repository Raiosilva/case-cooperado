import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLoadComponent } from './search-load.component';

describe('SearchLoadComponent', () => {
  let component: SearchLoadComponent;
  let fixture: ComponentFixture<SearchLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchLoadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
