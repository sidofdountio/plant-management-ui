import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { Species } from '../../../model/species';
import { PlantService } from '../../../service/plant.service';
import { SpeciesService } from '../../../service/specie.service';
import { Plant } from '../../../model/plant';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from '../../../service/snackbar.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-add-plant',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatSelectModule, MatInputModule, MatFormFieldModule,AsyncPipe],
  templateUrl: './add-plant.component.html',
  styleUrl: './add-plant.component.css'
})
export class AddPlantComponent implements OnInit{
  public isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  plantForm = this.fb.group({
    name: ['', Validators.required],
    buyAt: ['', Validators.required],
    imageUrl: [''],
    specieForm: this.fb.group({
      id: ['', Validators.required],
      name: ['']
    })
  })

  species: Species[] = [];
  plantRequest: Plant = {
    name: '',
    buyAt: '',
    imageUrl: '',
    specie: {
      id: 0,
      name: ''
    },
    id: 0
  };

  constructor(private fb: FormBuilder, private plantService: PlantService, private specieService: SpeciesService,
    private router:Router,private snacbarService:SnackbarService) {

  }
  ngOnInit(): void {
      this.specieService.getAllSpecie().subscribe(
        (response)=>{
          this.species = response;
        }
      )
  }

  onSavePlant() {
    this.plantRequest = {
      name: this.plantForm.value.name  as string,
      buyAt: this.plantForm.value.buyAt as string,
      imageUrl: this.plantForm.value.imageUrl as string,
      specie: {
        id: this.plantForm.value.specieForm?.id as undefined,
        name: ''
      }
    }
    this.save(this.plantRequest);
  }

  save(plant: Plant) {
    this.isLoadingSubject.next(true);
    this.plantService.addNewPlant(plant).subscribe(
      (response) => {
        this.isLoadingSubject.next(false);

        this.router.navigate(['/'])
      },
      () => {
        this.snacbarService.openSnackBarError("An error occured","close")
        this.isLoadingSubject.next(false);
      }
    )
  }

}
