import {Component, OnInit} from '@angular/core';

declare var createjs: any;

@Component({
  selector: 'app-kanvas',
  templateUrl: './kanvas.component.html',
  styleUrls: ['./kanvas.component.scss']
})
export class KanvasComponent implements OnInit {


  canvas;
  stage;
  drawingCanvas;
  oldPt;
  oldMidPt;
  title;
  color;
  stroke;
  colors;
  index;

  ngOnInit() {
    this.canvas = document.getElementById('myCanvas');
    this.index = 0;
    this.color = 'red';
    this.colors = ['#828b20', '#b0ac31', '#cbc53d', '#fad779', '#f9e4ad', '#faf2db', '#563512', '#9b4a0b', '#d36600', '#fe8a00', '#f9a71f'];
    //check to see if we are running in a browser with touch support
    this.stage = new createjs.Stage(this.canvas);
    this.stage.autoClear = false;
    this.stroke = Math.random() * 10 + 3 | 0;
    this.stage.enableDOMEvents(true);
    createjs.Touch.enable(this.stage);
    createjs.Ticker.framerate = 24;
    this.drawingCanvas = new createjs.Shape();
    this.stage.addEventListener('stagemousedown', this.handleMouseDown);
    this.stage.addEventListener('stagemouseup', this.handleMouseUp);
    this.stage.addChild(this.drawingCanvas);
    let width = 2000;
    let height = 1000;
    let grid = 125;
    for (let i = 0; i < width / grid; i++) {
      this.stage.addChild(this.make_line(i * grid, 0, i * grid, height));
    }
    for (let i = 0; i < height / grid; i++) {
      this.stage.addChild(this.make_line(0, i * grid, width, i * grid));
    }
    this.stage.update();
  }

  make_line(startX, startY, endX, endY) {
    let color = 'gray';
    let line = new createjs.Shape();
    line.graphics.setStrokeStyle(1);
    line.graphics.beginStroke(color);
    line.graphics.moveTo(startX, startY);
    line.graphics.lineTo(endX, endY);
    line.graphics.endStroke();
    return line;
  }

  handleMouseDown = (event) => {
    if (!event.primary) {
      return;
    }
    if (this.stage.contains(this.title)) {
      this.stage.clear();
      this.stage.removeChild(this.title);
    }
    this.oldPt = new createjs.Point(this.stage.mouseX, this.stage.mouseY);
    this.oldMidPt = this.oldPt.clone();
    this.stage.addEventListener('stagemousemove', this.handleMouseMove);
  };


  handleMouseMove = (event) => {
    if (!event.primary) {
      return;
    }
    var midPt = new createjs.Point(this.oldPt.x + this.stage.mouseX >> 1, this.oldPt.y + this.stage.mouseY >> 1);
    console.log(this.stroke);
    this.drawingCanvas.graphics.clear().setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(midPt.x, midPt.y).curveTo(this.oldPt.x, this.oldPt.y, this.oldMidPt.x, this.oldMidPt.y);
    this.oldPt.x = this.stage.mouseX;
    this.oldPt.y = this.stage.mouseY;
    this.oldMidPt.x = midPt.x;
    this.oldMidPt.y = midPt.y;
    this.stage.update();
  };

  handleMouseUp = (event) => {
    if (!event.primary) {
      return;
    }
    this.stage.removeEventListener('stagemousemove', this.handleMouseMove);
  };

  reset() {
    this.stage.clear();
  }
}

