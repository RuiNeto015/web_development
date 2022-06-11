import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsTradingComponent } from './points-trading.component';

describe('PointsTradingComponent', () => {
  let component: PointsTradingComponent;
  let fixture: ComponentFixture<PointsTradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsTradingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
