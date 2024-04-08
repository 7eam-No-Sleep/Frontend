import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGcComponent } from './view-gc.component';

describe('ViewGcComponent', () => {
  let component: ViewGcComponent;
  let fixture: ComponentFixture<ViewGcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewGcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
