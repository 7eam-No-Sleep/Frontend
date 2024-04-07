import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsLeftcolumnComponent } from './as-leftcolumn.component';

describe('AsLeftcolumnComponent', () => {
  let component: AsLeftcolumnComponent;
  let fixture: ComponentFixture<AsLeftcolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsLeftcolumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsLeftcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
