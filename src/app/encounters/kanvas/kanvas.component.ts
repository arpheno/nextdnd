import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fabric} from 'fabric';
import {EncounterService} from '../encounter.service';


@Component({
  selector: 'app-kanvas',
  templateUrl: './kanvas.component.html',
  styleUrls: ['./kanvas.component.scss']
})
export class KanvasComponent implements OnInit {
  private _canvas: fabric.Canvas;
  @Input()
  set canvas(c: any) {
    if (c === this._canvas) {

    } else {
      if (c != '') {
        try {
          this._canvas.loadFromJSON(c, () => {
            this._canvas.renderAll();
          });
        } catch (e) {
          console.log('Got canvas');
          console.log(c);
          console.log(typeof (c));
          this._canvas = c;
          this._canvas.renderAll();
        }
      }
    }
  }

  get canvas(): any {
    return this._canvas;
  }

  @Output()
  canvasChange = new EventEmitter<any>();


  makeLine(startX: number, startY: number, endX: number, endY: number): fabric.Line {
    return new fabric.Line([startX, startY, endX, endY], {
      stroke: 'gray',
      selectable: false
    });
  }

  constructor(private encounterService: EncounterService) {
  }

  makeGrid(width: number, height: number, spacing = 200): fabric.Line[] {
    let lines = [];
    for (let i = 0; i < width / spacing; i++) {
      lines.push(this.makeLine(i * spacing, 0, i * spacing, height));
    }
    for (let i = 0; i < height / spacing; i++) {
      lines.push(this.makeLine(0, i * spacing, width, i * spacing));
    }
    return lines;

  }

  ngOnInit(): void {

    this._canvas = new fabric.Canvas('myCanvas', {
      isDrawingMode: true
    });
    this.clear();
    fabric.Object.prototype.transparentCorners = false;
    this._canvas.on('mouse:up', x => this.canvasChange.emit(this._canvas));

  }

  clear() {
    this._canvas.clear();
    this.makeGrid(2000, 1000, 125).forEach(line => this._canvas.add(line));
  }


}
