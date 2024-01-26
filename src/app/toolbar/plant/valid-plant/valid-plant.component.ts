import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-valid-plant',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './valid-plant.component.html',
  styleUrl: './valid-plant.component.css'
})
export class ValidPlantComponent {
  discase: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogRef:MatDialogRef<ValidPlantComponent>){}
  save(): void {
    this.discase = true;
    this.dialogRef.close(this.discase);
  }
  cancel(): void {
    this.discase = false;
    this.dialogRef.close(this.discase);
  }

}
