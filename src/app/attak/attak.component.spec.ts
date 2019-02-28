import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AttakComponent} from './attak.component';

describe('AttakComponent', () => {
  let component: AttakComponent;
  let fixture: ComponentFixture<AttakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttakComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
