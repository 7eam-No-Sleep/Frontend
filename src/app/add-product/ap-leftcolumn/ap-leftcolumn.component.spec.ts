import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApLeftcolumnComponent } from './ap-leftcolumn.component';

describe('ApLeftcolumnComponent', () => {
  let component: ApLeftcolumnComponent;
  let fixture: ComponentFixture<ApLeftcolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApLeftcolumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApLeftcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
