import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarData } from '../../../model/snack-bar-data';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule,MatIconButton,MatIcon],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.css'
})
export class SnackBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {
  }

  snackBarRef = inject(MatSnackBarRef);
}
