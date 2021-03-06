import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Monster} from '../../api.service';
import {MatDialog} from '@angular/material';
import {AttakComponent} from '../../attak/attak.component';
import {BoardServiceService} from '../../board-service.service';
import {AUTHOR_ID} from '../../utils';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})

export class PartyComponent implements OnInit {
  private _members: Monster[];

  constructor(public dialog: MatDialog, private boardService: BoardServiceService) {
    this._members = [];
  }


  get members() {
    return this._members;
  }

  @Input()
  set members(t) {
    this._members = t;
    console.log(t);
  }

  @Output()
  membersChange = new EventEmitter<any>();

  sumxp() {
    let sumxp = this.members.map(x => x['xp']).reduce((a, b) => a + b, 0);
    return sumxp;
  }


  dragAttack(target, event) {

    let attacker = event.dragData;
    if (attacker != target) {

      console.log(event);
      const dialogRef = this.dialog.open(AttakComponent, {
        data: {attacker: attacker, target: target}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.membersChange.emit(this.members);
      });
    }
  }

  appDragStart(element, event: DragEvent) {
    element.offset_x = event.x;
    element.offset_y = event.y;
    element.orig_x = event.screenX - event.offsetX;
    element.orig_y = event.screenY - event.offsetY;
    element.origin_x = event.clientX - event.offsetX;
    element.origin_y = event.clientY - event.offsetY;
  }

  appDragEnd(element, event: DragEvent) {
    let overlap = false;
    document.elementsFromPoint(event.x, event.y).forEach(element => {
      if (element.classList.contains('member')) {
        overlap = true;
      }
    });
    if (!overlap) {

      let diff_x = event.x - element.offset_x;
      let diff_y = event.y - element.offset_y;
      let top = element.origin_y + diff_y;
      let left = element.origin_x + diff_x;
      element.style = {top: top + 'px', left: left + 'px', position: 'fixed'};
      this.membersChange.emit(this.members);
    }
  }

  ngOnInit() {

  }

}

