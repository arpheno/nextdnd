import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor,  NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-choicechooser',
  templateUrl: './choicechooser.component.html',
  styleUrls: ['./choicechooser.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChoicechooserComponent),
    multi: true
  }]
})
export class ChoicechooserComponent implements OnInit,ControlValueAccessor {
  @Input() choice: { name, choose: number, from: [{ name: string, type: string,contents:[] }] };
  private value: {};

  constructor() {
  }

  @Output() change = new EventEmitter<[{ type: string, name: string }]>();

  ngOnInit() {
    this.value = {};
  }

  onCheckChange(event, obj) {
    if (event.target.checked) {
      if (Object.entries(this.value).length < this.choice.choose) {
        this.value[obj.name] = obj;
      } else {
        event.target.checked = false;
      }
    } else {
      delete this.value[obj.name];
    }
    // @ts-ignore
    const emission = Object.entries(this.value).flatMap((x: [string,{contents:[]}]) => {
      if (x[1].contents) {
        return x[1].contents;
      } else {
        return [x[1]];
      }
    });
    console.log(emission);
    // @ts-ignore
    this.change.emit(emission);
    this.onChange(emission)
  }
  obj_to_names(some:[{name,type}]){
    if(some) {
      return some.map(x => {
        return x.name
      }).join(' ')
    }else{
      return ''
    }
  }
  onChange = (delta: any) => {};

  registerOnChange(fn: any): void {
    this.onChange=fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }
}
