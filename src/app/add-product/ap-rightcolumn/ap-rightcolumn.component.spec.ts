import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApRightcolumnComponent } from './ap-rightcolumn.component';

describe('ApRightcolumnComponent', () => {
  let component: ApRightcolumnComponent;
  let fixture: ComponentFixture<ApRightcolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApRightcolumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApRightcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
