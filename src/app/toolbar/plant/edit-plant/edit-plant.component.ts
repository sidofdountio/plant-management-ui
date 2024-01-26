import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Plant } from '../../../model/plant';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-plant',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,MatButtonModule,MatDialogModule],
  templateUrl: './edit-plant.component.html',
  styleUrl: './edit-plant.component.css'
})
export class EditPlantComponent {

  formPlant = this.fb.group({
    waterQuantity: ['',[Validators.required]],
    wateringFrequency: ['',[Validators.required]],
    wateringDate: ['',[Validators.required]]
  });

  plant:Plant = {
    name: '',
    buyAt: '',
    imageUrl: '',
    id: this.data.id,
    wateringDate: '',
    wateringFrequency:0,
    waterQuantity: 0,
    specie: {
      id: this.data.specie.id,
      name: this.data.specie.name
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: Plant,
    public dialogRef: MatDialogRef<EditPlantComponent>,
    private fb: FormBuilder) {
  }

  onSaveSaleProduct() {
    this.plant = {
      name: this.data.name,
      buyAt: this.data.buyAt,
      imageUrl: this.data.imageUrl,
      id: this.data.id,
      wateringDate: this.formPlant.value.wateringDate as undefined,
      wateringFrequency:this.formPlant.value.wateringFrequency as any,
      waterQuantity: this.formPlant.value.waterQuantity as any,
      specie: {
        id: this.data.specie.id,
        name: this.data.specie.name
      }
    }
    this.dialogRef.close(this.plant);
  }

  onClose() {
    this.dialogRef.close();
  }

}
