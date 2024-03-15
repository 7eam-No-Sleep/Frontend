import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcRightcolumnComponent } from './ac-rightcolumn.component';

describe('AcRightcolumnComponent', () => {
  let component: AcRightcolumnComponent;
  let fixture: ComponentFixture<AcRightcolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcRightcolumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcRightcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
