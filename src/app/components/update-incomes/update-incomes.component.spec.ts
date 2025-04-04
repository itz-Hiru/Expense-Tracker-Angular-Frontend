import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIncomesComponent } from './update-incomes.component';

describe('UpdateIncomesComponent', () => {
  let component: UpdateIncomesComponent;
  let fixture: ComponentFixture<UpdateIncomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateIncomesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
