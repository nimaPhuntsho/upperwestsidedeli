import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDailogComponent } from './logout-dailog.component';

describe('LogoutDailogComponent', () => {
  let component: LogoutDailogComponent;
  let fixture: ComponentFixture<LogoutDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
