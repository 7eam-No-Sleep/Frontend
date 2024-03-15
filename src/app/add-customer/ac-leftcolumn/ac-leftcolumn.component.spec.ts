import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcLeftcolumnComponent } from './ac-leftcolumn.component';

describe('AcLeftcolumnComponent', () => {
  let component: AcLeftcolumnComponent;
  let fixture: ComponentFixture<AcLeftcolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcLeftcolumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcLeftcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
