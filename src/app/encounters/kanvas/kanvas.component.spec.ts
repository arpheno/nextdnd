import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanvasComponent } from './kanvas.component';

describe('KanvasComponent', () => {
  let component: KanvasComponent;
  let fixture: ComponentFixture<KanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
