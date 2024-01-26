import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarData } from '../../../model/snack-bar-data';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-snackbar-error',
  standalone: true,
  imports: [MatButtonModule,MatSnackBarModule,MatIcon],
  templateUrl: './snackbar-error.component.html',
  styleUrl: './snackbar-error.component.css'
})
export class SnackbarErrorComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {
  }
  
  snackBarRef = inject(MatSnackBarRef);

}
