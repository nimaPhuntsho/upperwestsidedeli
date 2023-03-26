import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroissantComponent } from './croissant.component';

describe('CroissantComponent', () => {
  let component: CroissantComponent;
  let fixture: ComponentFixture<CroissantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CroissantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CroissantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
