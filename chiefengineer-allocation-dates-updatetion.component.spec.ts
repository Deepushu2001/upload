import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefengineerAllocationDatesUpdatetionComponent } from './chiefengineer-allocation-dates-updatetion.component';

describe('ChiefengineerAllocationDatesUpdatetionComponent', () => {
  let component: ChiefengineerAllocationDatesUpdatetionComponent;
  let fixture: ComponentFixture<ChiefengineerAllocationDatesUpdatetionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiefengineerAllocationDatesUpdatetionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiefengineerAllocationDatesUpdatetionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
