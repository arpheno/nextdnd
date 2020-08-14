import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor,  NG_VALUE_ACCESSOR} from '@angular/forms';
import {CharacterService} from '../../character.service';
import {SpellService} from '../../../equipment/spell.service';

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
  private descs: {};
  get choice(): { name; choose: number; from: [{ name: string; type: string; contents: [] }] } {
    return this._choice;
  }

  @Input() set choice(value: { name; choose: number; from: [{ name: string; type: string; contents: [] }] }) {

    this._choice = value;
    value.from.forEach(value1 => {
      this.spellService.spellDetail(value1.name).subscribe(next=>{
        console.log(next);
        this.descs[next.name]=next;
      });
    })
  }
  private _choice: { name, choose: number, from: [{ name: string, type: string,contents:[] }] };
  private value: {};
  constructor(
    private spellService: SpellService,
  ) {
  }

  @Output() change = new EventEmitter<[{ type: string, name: string }]>();

  ngOnInit() {
    this.value = {};
    this.descs = {};
  }

  onCheckChange(event, obj) {
    if (event.target.checked) {
      if (Object.entries(this.value).length < this._choice.choose) {
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
  obj_to_names(some){
    if(some.contents) {
      return some.contents.map(x => {
        return x.name
      }).join(' ')
    }else{
      // console.log(some);
      if(this.descs[some.name]){

        let desc = this.descs[some.name];

        return `<div>${desc.name}</div>
 <div>Range:${desc.range}</div> 
 <div>Duration:${desc.duration}</div> 
 <div>Casting Time:${desc.casting_time}</div> 
<div>${desc.description}</div>`;
      };
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
