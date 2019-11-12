import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureRadioComponent } from './picture-radio.component';
import {MatTooltipModule} from '@angular/material';
import {SnakecasePipe} from '../../snakecase.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('PictureRadioComponent', () => {
  let component: PictureRadioComponent;
  let fixture: ComponentFixture<PictureRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureRadioComponent,
        SnakecasePipe
      ],
      imports:[    MatTooltipModule,ReactiveFormsModule,FormsModule]
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
