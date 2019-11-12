import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicechooserComponent } from './choicechooser.component';
import {MatTooltipModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SnakecasePipe} from '../../snakecase.pipe';

describe('ChoicechooserComponent', () => {
  let component: ChoicechooserComponent;
  let fixture: ComponentFixture<ChoicechooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicechooserComponent ,

  ],
      imports:[    MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicechooserComponent);
    component = fixture.componentInstance;
    component.choice = {name:'a',choose:5,from:[{name:'abc',type:'gear',contents:[]}]};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
