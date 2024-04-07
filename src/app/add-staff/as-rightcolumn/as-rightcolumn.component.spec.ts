import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsRightcolumnComponent } from './as-rightcolumn.component';

describe('AsRightcolumnComponent', () => {
  let component: AsRightcolumnComponent;
  let fixture: ComponentFixture<AsRightcolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsRightcolumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsRightcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
