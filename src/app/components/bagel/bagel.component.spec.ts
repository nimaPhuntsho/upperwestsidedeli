import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagelComponent } from './bagel.component';

describe('BagelComponent', () => {
  let component: BagelComponent;
  let fixture: ComponentFixture<BagelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
