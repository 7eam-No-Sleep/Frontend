import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessReturnsComponent } from './process-returns.component';

describe('ProcessReturnsComponent', () => {
  let component: ProcessReturnsComponent;
  let fixture: ComponentFixture<ProcessReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessReturnsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
