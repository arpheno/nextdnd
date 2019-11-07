import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureRadioComponent } from './picture-radio.component';

describe('PictureRadioComponent', () => {
  let component: PictureRadioComponent;
  let fixture: ComponentFixture<PictureRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
