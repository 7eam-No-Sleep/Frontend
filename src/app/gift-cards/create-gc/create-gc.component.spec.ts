import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGcComponent } from './create-gc.component';

describe('CreateGcComponent', () => {
  let component: CreateGcComponent;
  let fixture: ComponentFixture<CreateGcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
