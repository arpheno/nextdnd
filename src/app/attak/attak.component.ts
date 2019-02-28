import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {execute_attack} from '../utils';

@Component({
  selector: 'app-attak',
  templateUrl: './attak.component.html',
  styleUrls: ['./attak.component.scss']
})
export class AttakComponent implements OnInit {
  selectedAttack: any;
  advantage: number = 0;


  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AttakComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onYesClick(target, attack): void {
    let message = execute_attack(target, attack, this.advantage);

    this.snackBar.open(message);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    this.selectedAttack = this.data.attacker.attacks[0];
  }

}
